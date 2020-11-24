import {ossServices} from 'services/oss';
import { Button, Image, message, Modal, Upload } from 'antd';
import React, { useMemo, useState,useEffect } from 'react';
import './index.scss';
import TextArea from 'antd/lib/input/TextArea';
import EditorImage from './components/editorImage';

function Tinymce(props){
    const plugins = [
    `advlist anchor autolink autosave code codesample colorpicker colorpicker
    contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime
    legacyoutput link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace
    spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount`
    ];
    const toolbar = [
    `bold italic underline strikethrough alignleft aligncenter
    alignright outdent indent  blockquote undo redo removeformat code`,
    `hr bullist numlist link image charmap	 preview anchor pagebreak
    fullscreen insertdatetime media table forecolor backcolor`
    ];
    const {id,value,propToolbar,menubar,height,width} = props;
    const fileList=useMemo(() => {
        let fileList=[];
        for(let i=0;i<value.length;i++){
          fileList.push({url:value[i]}); 
        }
        return fileList;
    }, [value]);

    //Data
    const [hasChange, setHasChange] = useState(false);
    const [hasInit, setHasInit] = useState(false);
    const [tinymceId, setTinymceId] = useState(id|| 'tinymce-'+ +new Date());

    //Watch
    useEffect((val) => {
        if (!hasChange && hasInit) {
            process.nextTick(()=>{
                window.tinymce.get(tinyumceId).setContent(val);
            })
        }
    }, [value])
    useEffect(() => {
        initTinymce();
        return ()=>{
            destroyTinymce();
        }
    }, [])
    //Methods
    const initTinymce=()=>{
        window.tinymce.init({
          selector: `#${tinymceId}`,
          width: width||720,
          height: height||360,
          language: 'en',
          body_class: 'panel-body ',
          object_resizing: false,
          toolbar: propToolbar?propToolbar.length > 0 ?propToolbar : toolbar:toolbar,
          menubar: false,
          plugins: plugins,
          end_container_on_empty_block: true,
          powerpaste_word_import: 'clean',
          code_dialog_height: 450,
          code_dialog_width: 1000,
          advlist_bullet_styles: 'square',
          advlist_number_styles: 'default',
          imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
          default_link_target: '_blank',
          link_title: false,
          init_instance_callback: editor => {
            if (value) {
              setContent(value)
            }
            setHasInit(true);
            editor.on('NodeChange Change KeyUp SetContent', () => {
              setHasChange(true);
            })
          }
        })
    }
    const destroyTinymce=()=>{
        if (window.tinymce.get(tinymceId)) {
            window.tinymce.get(tinymceId).destroy()
        }
    }
    const setContent=(value)=>{
        window.tinymce.get(tinymceId).setContent(value)
    }
    const getContent=()=>{
        window.tinymce.get(tinymceId).getContent()
    }
    const imageSuccessCBK=(arr)=>{
        arr.forEach(v => {
          window.tinymce.get(tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`)
        })
    }
    return(
        <div className="tinymce-container editor-container">
            <TextArea className="tinymce-textarea" id={tinymceId}/>
            <div className="editor-custom-btn-container">
                <EditorImage className="editor-upload-btn" successCBK = {imageSuccessCBK}></EditorImage>
            </div>
        </div>
    )
}
export default Tinymce;