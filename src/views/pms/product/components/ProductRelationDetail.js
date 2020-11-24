import React, {useState, useEffect, useMemo} from 'react';
import { Button, Form, Space, Transfer } from 'antd';
import {subjectServices} from 'services/subject'
import {preferenceAreaServices} from 'services/preferenceArea'

function ProductRelationDetail(props){
    let {form,value,isEdit,handleProductParamChange,finishCommit,prevStep,setProductParam} = props;

    //Initial
    useEffect(() => {
        getSubjectList();
        getPreferenceAreaList();
    }, [])

    //Computed
    const selectSubject = useMemo(() => {
        let subjects =[];
        if(value.subjectProductRelationList==null||value.subjectProductRelationList.length<=0){
            return subjects;
        }
        for(let i=0;i<value.subjectProductRelationList.length;i++){
            subjects.push(value.subjectProductRelationList[i].subjectId);
        }
        return subjects;
    }, [value]);
    const setSelectSubject=(nextTargetKeys, direction, moveKeys)=>{
        let temp = [];
        for(let i=0;i<nextTargetKeys.length;i++){
            temp.push({subjectId:nextTargetKeys[i]});
        }
        setProductParam({...value,subjectProductRelationList:[...temp]})
    }
    const selectPreferenceArea= useMemo(() => {
        let preferenceAreas =[];
        if(value.preferenceAreaProductRelationList==null||value.preferenceAreaProductRelationList.length<=0){
            return preferenceAreas;
        }
        for(let i=0;i<value.preferenceAreaProductRelationList.length;i++){
            preferenceAreas.push(value.preferenceAreaProductRelationList[i].preferenceAreaId);
        }
        return preferenceAreas;
    }, [value])
    const setSelectPreferenceArea=(nextTargetKeys, direction, moveKeys)=>{
        let temp = [];
        for(let i=0;i<nextTargetKeys.length;i++){
            temp.push({preferenceAreaId:nextTargetKeys[i]});
        }
        setProductParam({...value,preferenceAreaProductRelationList:[...temp]})
    }

    //Data
    const [subjectList, setSubjectList] = useState([]);
    const [subjectTitles, setSubjectTitles] = useState(['ToSelect','Selected']);
    const [preferenceAreaList, setPreferenceAreaList] = useState([]);
    const [preferenceAreaTitles, setPreferenceAreaTitles] = useState(['ToSelect','Selected']);
    const [selectedSubject, setSelectedSubject] = useState([]);
    const [selectedPreference, setSelectedPreference] = useState([]);
    
    //Method
    const filterMethod=(query,item)=>{
        return item.label.indexOf(query)>-1;
    }
    const getSubjectList=()=>{
        subjectServices.fetchListAll().then(response => {
            let list = response.data;
            let tempList = subjectList;
            for (let i = 0; i < list.length; i++) {
                tempList.push({
                label: list[i].title,
                key: list[i].id
              });
            }
            setSubjectList([...tempList]);
        });
    }
    const getPreferenceAreaList=()=>{
        preferenceAreaServices.fetchList().then(response=>{
            let list = response.data;
            let tempList = preferenceAreaList;
            for (let i = 0; i < list.length; i++) {
                tempList.push({
                    label: list[i].name,
                    key: list[i].id
                });
            }
            setPreferenceAreaList([...tempList]);
        }).catch(error=>{
            console.log(error);
        });
    }
    const handlePrev=()=>{
        prevStep();
    }
    const handleFinishCommit=()=>{
        finishCommit(isEdit);
    }
    const subjectTransferStatus={
        searchPlaceholder:"Enter subject name!"
    }
    const preferenceTransferStatus={
        searchPlaceholder:"Enter preference name!"
    }
    const handleSubjectSelectChange=(sourceSelectedKeys, targetSelectedKeys)=>{
        setSelectedSubject([...sourceSelectedKeys,...targetSelectedKeys]);
    }
    const handlePreferenceSelectChange=(sourceSelectedKeys, targetSelectedKeys)=>{
        setSelectedPreference([...sourceSelectedKeys,...targetSelectedKeys]);
    }
    return(
        <div style={{marginTop:'50px'}} id="ProductRelationDetail">
            <Form form={form} labelCol={{span:4}} >
                <Form.Item label="Subject: ">
                    <Transfer filterOption={filterMethod} showSearch locale={{...subjectTransferStatus}} render={item=>item.label} targetKeys={selectSubject}
                    listStyle={{
                        width: 250,
                    }}
                    onSelectChange={handleSubjectSelectChange}
                    dataSource={subjectList} titles={subjectTitles} selectedKeys={selectedSubject} onChange={setSelectSubject}/>
                </Form.Item>
                <Form.Item label="Preference: ">
                    <Transfer filterOption={filterMethod} showSearch locale={{...preferenceTransferStatus}} render={item=>item.label} targetKeys={selectPreferenceArea}
                    listStyle={{
                        width: 250,
                    }}
                    onSelectChange={handlePreferenceSelectChange}
                    dataSource={preferenceAreaList} titles={preferenceAreaTitles} selectedKeys={selectedPreference} onChange={setSelectPreferenceArea}/>
                </Form.Item>
                <Form.Item style={{textAlign:'center'}}>
                    <Space>
                        <Button size="middle" onClick={handlePrev}>Prev, enter product attribution</Button>
                        <Button type="primary" size="middle" onClick={handleFinishCommit}>Done, confirm product</Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}
export default ProductRelationDetail;