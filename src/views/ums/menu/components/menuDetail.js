import { Button, Card, Cascader, DatePicker, Form, Input, message, Radio, Select, Table } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import {menuServices} from 'services/menu';

function MenuDetail(props){
    const route = useLocation();
    const [menuForm] = Form.useForm();
    const {Option} = Select;
    const {isEdit} = props;
    //Initial
    useEffect(() => {
        if(isEdit) {
            menuServices.getMenu(route.state.id).then(response=>{
                menuForm.setFieldsValue(response.data);
            })
        } else {
            menuForm.setFieldsValue(defaultMenu);
        }
        getSelectMenuList();
    }, [])

    //Data
    const defaultMenu = {
        title: '',
        parentId: 0,
        name: '',
        icon: '',
        hidden: 0,
        sort: 0
    };
    const [selectMenuList, setSelectMenuList] = useState([]);

    //Methods
    const getSelectMenuList=()=>{
        menuServices.fetchList(0, {pageSize: 100, pageNum: 1}).then(response => {
            let menu = response.data.list;
            menu.unshift({id: 0, title: 'No Parent'});
            setSelectMenuList(menu);
        });
    }
    const onSubmit=()=>{
        confirm({
            title:"Are you sure to submit data?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                if(isEdit){
                    menuServices.updateMenu(route.state.id,menuForm.getFieldValue()).then(response=>{
                        message.success('Modify Success',10);
                        history.back();
                    })
                } else {
                    menuServices.createMenu(menuForm.getFieldValue()).then(response=>{
                        message.success('Modify Success',10);
                        history.back();
                    })
                }
            },
            onCancel(){}
        });
    }
    const onSubmitFail=()=>{
        message.error('Validation Fail',10);
        return false;
    }
    const resetForm=()=>{
        menuForm.setFieldsValue(defaultMenu);
        getSelectMenuList();
    }
    return(
        <Card className="form-container">
            <Form form={menuForm} labelCol={{span:5}} size="small" onFinish={onsubmit} onFinishFailed={onSubmitFail}>
                <Form.Item label="MenuTitle: " name="title"
                rules={[{required:true,message:"Please enter menu title"},
                {min:2,max:140,message:'Length must be between 2 and 140'}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="ParentMenu: " name="parentId">
                    <Select placeholder="Please select menu">
                        {selectMenuList.map((item)=>{
                            return <Option key={item.id} value={item.id}>{item.title}</Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="Name: " name="name"
                rules={[{required:true,message:"Please enter frontend name"},
                {min:2,max:140,message:'Length must be between 2 and 140'}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Icon: " name="icon"
                rules={[{required:true,message:"Please enter frontend icon"},
                {min:2,max:140,message:'Length must be between 2 and 140'}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Hidden: " name="hidden">
                    <Radio.Group>
                        <Radio value={0}>Yes</Radio>
                        <Radio value={1}>No</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Sort: " name="sort">
                    <Input type="number"/>
                </Form.Item>
                <Form.Item >
                    <Button type="primary" onClick={onSubmit}>Submit</Button>
                    {!isEdit && <Button onClick={resetForm}>Reset</Button>}
                </Form.Item>
            </Form>
        </Card>
    )
}
export default MenuDetail;