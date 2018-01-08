import {Component, Input} from '@angular/core';
// import {Camera} from '@ionic-native/camera';
import {Factorys} from '../../../theme/factorys';

import {UploadService} from '../../../service/common/upload-service';
import {DelImgService} from '../../../service/common/delImg-service';

@Component({
  selector: 'CommonPhoto',
  templateUrl: 'photo.html',
  providers: [UploadService, DelImgService]
})
export class CommonPhoto {

  @Input()
  imgList: Array<string>

  private delImgList = [];

  constructor(public factorys: Factorys, public uploadService: UploadService, public delImgService: DelImgService) {
  }

  openPicture() {
    if (this.imgList.length === 4) {
      this.factorys.alert('图片装不下了！');
      return false;
    }
    // this.camera.getPicture({
    //   // 配置项
    //   quality: 100, // 图片质量
    //   destinationType: this.camera.DestinationType.DATA_URL,// 选择base64
    //   encodingType: this.camera.EncodingType.JPEG, // 图片JPG
    //   mediaType: this.camera.MediaType.PICTURE, // 只能是照片
    //   saveToPhotoAlbum: false, // 不存本地
    //   targetWidth: 200, //压缩(px)
    //   targetHeight: 200
    // }).then((base64) => {
    //   this.factorys.base64ToFormData(base64).then((formData) => {
    //     this.uploadService.post(formData).then((data) => {
    //       this.imgList.push(data['content']);
    //       this.factorys.prop('上传成功！');
    //     });
    //   });
    // }, (err) => {
    //   // 关闭相机处理
    // });
  }

  deletePhoto(index) {
    this.factorys.confirm('是否删除该照片?').then(() => {
      // 先把将要删除的存起来
      this.delImgList.push(this.imgList[index]);
      this.imgList.splice(index, 1);
    }, () => {
    });
  }

  delImgHttp() {
    this.delImgList.map((url) => {
      // 删除图片请求
      this.delImgService.post({img: `group${url.split('group')[1]}`});
    });
  }
}
