import React, {useState, useEffect} from 'react';
import { Button, Card, Checkbox, Col, message, Row } from 'antd';
import {resourceServices} from 'services/resource';
import {resourceCategoryServices} from 'services/resourceCategory';
import {roleServices} from 'services/role';
import { history } from '../../../redux/shared/history-redux';
import './allocResource.scss';
import { useLocation } from 'react-router-dom';
import confirm from 'antd/lib/modal/confirm';

function AllocResource(){
  const route = useLocation();
    //Initial
    useEffect(() => {
      getList();
    }, [])

    //Data
    const [roleId, setRoleId] = useState(route.state.roleId);
    const [allResource, setAllResource] = useState([]);
    const [allResourceCate, setAllResourceCate] = useState([]);
    

    //Methods
    const getList=()=>{
      resourceServices.fetchAllResourceList().then(response => {
        let tempAllResource = response.data;
        for (let i = 0; i < tempAllResource.length; i++) {
            tempAllResource[i]['checked'] = false;
        }
        resourceCategoryServices.listAllCate().then(response => {
          let tempAllResourceCate = response.data;
          for (let i = 0; i < tempAllResourceCate.length; i++) {
              tempAllResourceCate[i]['checked'] = false;
          }
          roleServices.listResourceByRole(roleId).then(response=>{
            let allocResource = response.data;
            let resource = tempAllResource;
            let resourceCate = tempAllResourceCate;
            resource.forEach(item=>{
              item.checked = getResourceChecked(item.id,allocResource);
            });
            resourceCate.forEach(item=>{
              item.checked = firstCheck(item.id,resource);
            });
            setAllResource(tempAllResource);
            setAllResourceCate(tempAllResourceCate);
          });
        });
      });
    }
    const firstCheck=(categoryId,firstTime)=>{
      let cateResource = [];
      if (firstTime == null){
        cateResource=null;
      }
      if (cateResource == null) return false;
      for (let i = 0; i < firstTime.length; i++) {
        let resource = firstTime[i];
        if (resource.categoryId === categoryId) {
          cateResource.push(resource);
        }
      }
      let checkedCount = 0;
      for (let i = 0; i < cateResource.length; i++) {
        if (cateResource[i].checked === true) {
          checkedCount++;
        }
      }
      if(checkedCount===0){
        return false;
      }
      return checkedCount === cateResource.length;
    }
    const getAllResourceList=(allResourceCate)=>{
        resourceServices.fetchAllResourceList().then(response => {
            let tempAllResource = response.data;
            for (let i = 0; i < tempAllResource.length; i++) {
                tempAllResource[i]['checked'] = false;
            }
            getResourceByRole(roleId,allResourceCate,tempAllResource);
            setAllResource(tempAllResource);
        });
    }
    const getAllResourceCateList=()=>{
        resourceCategoryServices.listAllCate().then(response => {
            let tempAllResourceCate = response.data;
            for (let i = 0; i < tempAllResourceCate.length; i++) {
                tempAllResourceCate[i]['checked'] = false;
            }
            setAllResourceCate(tempAllResourceCate);
            getAllResourceList(tempAllResourceCate);
        });
    }
    const getResourceByCate=(categoryId)=>{
        let cateResource = [];
        if (allResource == null) return null;
        for (let i = 0; i < allResource.length; i++) {
          let resource = allResource[i];
          if (resource.categoryId === categoryId) {
            cateResource.push(resource);
          }
        }
        return cateResource;   
        
    }
    const getResourceByRole=(roleId,resourceCate,resource)=>{
        roleServices.listResourceByRole(roleId).then(response=>{
          let allocResource = response.data;
          let tempAllResource = resource;
          let tempAllResourceCate = resourceCate;
          tempAllResource.forEach(item=>{
            item.checked = getResourceChecked(item.id,allocResource);
          });
          tempAllResourceCate.forEach(item=>{
            item.checked = isAllChecked(item.id,resource);
          });
          setAllResource(tempAllResource);
          setAllResourceCate(tempAllResourceCate);
        });
    }
    const getResourceChecked=(resourceId,allocResource)=>{
        if(allocResource==null||allocResource.length===0) return false;
        for(let i=0;i<allocResource.length;i++){
          if(allocResource[i].id===resourceId){
            return true;
          }
        }
        return false;
    }
    const isIndeterminate=(categoryId)=>{
        let cateResources = getResourceByCate(categoryId);
        if (cateResources == null) return false;
        let checkedCount = 0;
        for (let i = 0; i < cateResources.length; i++) {
          if (cateResources[i].checked === true) {
            checkedCount++;
          }
        }
        return !(checkedCount === 0 || checkedCount === cateResources.length);
    }
    const isAllChecked=(categoryId)=>{
      let cateResources = getResourceByCate(categoryId);
      
      if (cateResources == null) return false;
      let checkedCount = 0;
      for (let i = 0; i < cateResources.length; i++) {
        if (cateResources[i].checked === true) {
          checkedCount++;
        }
      }
      if(checkedCount===0){
        return false;
      }
      return checkedCount === cateResources.length;
    }
    const handleSave=()=>{
        confirm({
            title:"Are you sure to alloc resource?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                let checkedResourceIds = new Set();
                if (allResource != null && allResource.length > 0) {
                    allResource.forEach(item => {
                    if (item.checked) {
                      checkedResourceIds.add(item.id);
                    }
                  });
                }
                let params = new URLSearchParams();
                params.append("roleId", roleId);
                params.append("resourceIds", Array.from(checkedResourceIds));
                roleServices.allocResource(params).then(response => {
                  message.success("Alloc Success",10);
                  history.goBack();
                })
            },
            onCancel(){}
        });
    }
    const handleClear=()=>{
        let tempAllResource = allResource;
        let tempAllResourceCate = allResourceCate;
        tempAllResourceCate.forEach(item => {
            item.checked = false;
        });
        tempAllResource.forEach(item => {
            item.checked = false;
        });
        setAllResourceCate([...tempAllResourceCate]);
        setAllResource([...tempAllResource]);
    }
    const handleCheckAllChange=(e,cate)=>{
        let cateResource = allResource;
        for(let i =0;i<cateResource.length;i++){
          if(cateResource[i].categoryId == cate.id){
            cateResource[i].checked=e.target.checked;
          }
        }
        setAllResource([...cateResource]);
    }
    const handleCheckChange=(resource)=>{
        let tempAllResourceCate = allResourceCate;
        tempAllResourceCate.forEach(item=>{
            if(item.id===resource.categoryId){
              item.checked = isAllChecked(resource.categoryId);
            }
        });
        setAllResourceCate([...tempAllResourceCate]);
    }
    const handleSetAllResourceCate=(e,param)=>{
      let temp = allResourceCate;
      for(let i = 0;i<temp.length;i++){
        if(temp[i].id==param.id){
          temp[i].checked = e.target.checked;
          break;
        }
      }
      setAllResourceCate([...temp]);
    }
    const handleSetAllResource=(e,param)=>{
      let temp = allResource;
      for(let i = 0;i<temp.length;i++){
        if(temp[i].id==param.id){
          temp[i].checked = e.target.checked;
          break;
        }
      }
      setAllResource([...temp]);
    }
    return(
        <Card className="form-container">
            {allResourceCate.map((cate,index)=>{
                return <div className={index ===0?"AllocResource_top-line":null} key={`cate${cate.id}`}>
                    <Row key className="AllocResource_table-layout" style={{background:'#F2F6FC'}}>
                        <Checkbox checked={cate.checked} indeterminate={isIndeterminate(cate.id)}
                        onChange={(e)=>{handleSetAllResourceCate(e,cate),handleCheckAllChange(e,cate)}}>
                            {cate.name}
                        </Checkbox>
                    </Row>
                    <Row className="AllocResource_table-layout">
                        {getResourceByCate(cate.id).map((resource)=>{
                            return <Col span={8} key={resource.id} style={{padding:'4px 0'}}>
                                <Checkbox checked={resource.checked} onChange={(e)=>{handleSetAllResource(e,resource),handleCheckChange(resource)}}>
                                    {resource.name}
                                </Checkbox>
                            </Col>
                        })}
                    </Row>
                </div> 
            })}
            <div style={{marginTop:'20px',alignContent:'center'}}>
                <Button type="primary" onClick={handleSave}>Save</Button>
                <Button onClick={handleClear}>Clear</Button>
            </div>
        </Card>
    )
}
export default AllocResource ;