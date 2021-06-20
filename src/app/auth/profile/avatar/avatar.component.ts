import { Component, Input, Output, EventEmitter } from '@angular/core';
import Storage from '@aws-amplify/storage';
import { NotificationService } from 'src/app/services/notification.service';
import { CompressorService } from 'src/app/services/compressor.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent {

  photoUrl: string | undefined;
  hasPhoto: boolean = false;
  uploading: boolean = false;
  s3ImageFile: any = null;
  s3ImagePath: string = "avatar";
  errorMessage: string | undefined;
  previewClass = "app-avatar-upload";
  fileUploaded: boolean = false;
  id: string | undefined;

  private _storageOptions: any = { 'level': 'public' };
  private _previewClassIdle = "app-avatar-upload";
  private _previewClassOver = "app-avatar-upload-dragover"

  @Input()
  set userId(userId: string) {
    this.id =  userId;
  }
  @Input()
  set url(url: string) {
    if(url){
      this.photoUrl = url;
      this.hasPhoto = true;
      this.fileUploaded = true;
    }else{
      this.photoUrl = undefined;
      this.hasPhoto = false;
    }
  }

  @Input()
  set storageOptions(storageOptions: any){
    this._storageOptions = Object.assign(this._storageOptions, storageOptions);
  }

  @Input()
  set path(path: string){
    this.s3ImagePath = path;
  }

  @Input()
  set data(data: any) {
    this.photoUrl = data.url;
    this.s3ImagePath = data.path;
    this._storageOptions = Object.assign(this._storageOptions, data.storageOptions);
    this.hasPhoto = true;
  }

  @Output()
  picked: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  loaded: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  uploaded: EventEmitter<Object> = new EventEmitter<Object>();

  @Output()
  removed: EventEmitter<null> = new EventEmitter<null>();

  constructor( private notification: NotificationService,
               private compressor: CompressorService ) {
               }

  async pick(evt: { target: { files: any[]; } | undefined; dataTransfer: { files: any[]; } | undefined; preventDefault?: any; }) {
    let file = null;
    if (evt.target && evt.target.files) {
      file = evt.target.files[0];
    }
    if (!file && evt.dataTransfer && evt.dataTransfer.files) {
      file = evt.dataTransfer.files[0];
    }
    if (!file) { return; }
    const isImage = file.type.split('/')[0] === 'image';
    if (!isImage) {
      this.previewClass = this._previewClassIdle;
      return this.notification.show('Only images are allowed.');
    }

    if (!this._storageOptions.contentType) {
      this._storageOptions.contentType = file.type;
    }
    // console.log('file size: ', file.size);
    this.picked.emit(file);
    // this.compressor.compress(file).subscribe(
      // async (file: File) => {
        const { name, size, type } = file;
        // console.log('compressed size: ', size);
        const fileName = file.name.split('.');
        const fileExt = fileName[fileName.length - 1];
        this.s3ImagePath = `${this.s3ImagePath}/${this.id}.${fileExt}`
        this.s3ImageFile = file;
        const that = this;
        const reader = new FileReader();

        reader.onload = async function(e) {
          const target: any = e.target;
          const url = target.result;
          that.photoUrl = url;
          that.hasPhoto = true;
        //   that.loaded.emit(url);
          // await that.uploadFile().then(response => {
          //   // console.log(response);
          // })
          // .catch(error => {
          //   console.log(error)
          // });
        };
        // this.hasPhoto = true;
        reader.readAsDataURL(file);
        // return;
      // }
    // );
    return;
  }

  async uploadFile() {
  	this.uploading = true;
  	await Storage.put(
  			this.s3ImagePath,
  			this.s3ImageFile, this._storageOptions)
		.then ( async (result:any) => {
      this.uploaded.emit(result);
      this.fileUploaded = true;
			await this.completeFileUpload();
		})
		.catch( error => {
			this.completeFileUpload(error);
		});
  }

  completeFileUpload(error?:any) {
  	if (error) {
  		return this._setError(error);
    }
    this.uploading = false;
  }

  removePhoto(){
    this.hasPhoto = false;
    this.fileUploaded = false;
    this.removed.emit();
  }

  onPhotoError() {
    this.hasPhoto = false;
    console.log("Photo Has Error");
    console.log(this.photoUrl);
  }

  onAlertClose() {
    this._setError(null);
  }

  async onDrop(event: { target: { files: any[]; } | undefined; dataTransfer: { files: any[]; } | undefined; preventDefault: any; }) {
    event.preventDefault();
    await this.pick(event);
  }

  onDragover(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.previewClass = this._previewClassOver;
  }

  onDragout(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.previewClass = this._previewClassIdle;
  }

  _setError(err: { message: any; } | null) {
    if (!err) {
      this.errorMessage = undefined;
      return;
    }
    this.errorMessage = err.message || err;
  }

}
