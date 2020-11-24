import {ossServices} from 'services/oss';
import { Button, Image, Modal, Upload } from 'antd';
import React, { useMemo, useState } from 'react';

function SingleUpload(props){
    const {value,name,onChange} = props;
    const imageUrl=useMemo(() => {
        return value;
    }, [value]);
    const imageName=useMemo(() => {
        if (value != null && value !== '') {
            return value.substr(value.lastIndexOf("/") + 1);
        } else {
            return null;
        }
    }, [value]);
    let fileList=useMemo(() => {
        return [{
            uid: null,
            name: imageName,
            url: imageUrl
        }]
    }, [imageName,imageUrl]);
    
    let showFileList = useMemo(() => {
       return value !== null && value !== ''&& value!==undefined;
    }, [value])

    //Data
    const [dataObj, setDataObj] = useState({
        policy: '',
        signature: '',
        key: '',
        ossaccessKeyId: '',
        dir: '',
        host: '',
    })
    const [dialogVisible, setDialogVisible] = useState(false);
    const [useOss, setUseOss] = useState(true);
    const [ossUploadUrl, setossUploadUrl] = useState('http://macro-oss.oss-cn-shenzhen.aliyuncs.com');
    const [minioUploadUrl, setMinioUploadUrl] = useState('http://localhost:8080/minio/upload');

    //Methods
    const emitInput=(val)=>{
        onChange(val,name);
    }
    const handleRemove=(file,fileList)=>{
        emitInput('');
    }
    const handlePreview=(file)=>{
        setDialogVisible(true);
    }
    const beforeUpload=(file)=>{
        let _self = dataObj;
        if(!useOss){
          return true;
        }
        return new Promise((resolve, reject) => {
          ossServices.policy().then(response => {
            _self.policy = response.data.policy;
            _self.signature = response.data.signature;
            _self.ossaccessKeyId = response.data.accessKeyId;
            _self.key = response.data.dir + '/${filename}';
            _self.dir = response.data.dir;
            _self.host = response.data.host;
            setDataObj(_self);
            resolve(true)
          }).catch(err => {
            console.log(err)
            reject(false)
          })
        })
    }
    const handleUploadSuccess=(res,file)=>{
        showFileList = true;
        fileList.pop();
        let url = dataObj.host + '/' + dataObj.dir + '/' + file.name;
        if(!useOss){
          url = res.data.url;
        }
        fileList.push({uid:file.uid,name: file.name, url: url});
        emitInput(fileList[0].url);
    }
    return(
        <div>
            <Upload action={useOss?ossUploadUrl:minioUploadUrl} data={useOss?dataObj:null}
            listType="picture" multiple={false} showUploadList={showFileList} fileList={fileList}
            beforeUpload={beforeUpload} onRemove={handleRemove} onPreview={handlePreview}
            onChange={(e)=>handleUploadSuccess(null,e.file)}>
                <Button size="small" type="primary">Upload</Button>
                <div className="">JPG/PNG file only, not exceed 10MB.</div>
            </Upload>
             <Modal visible={dialogVisible}>
                 <Image width="100%" src={fileList[0].url} alt=""/> 
             </Modal>
        </div>
        
    )
}
export default SingleUpload;