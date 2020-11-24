import { Button, Card, message, Tree} from 'antd';
import confirm from 'antd/lib/modal/confirm';
import React, {useState, useEffect, useRef} from 'react';
import {useLocation} from 'react-router-dom';
import {menuServices} from 'services/menu';
import {roleServices} from 'services/role';

function AllocMenu(){
    const route = useLocation();
    const tree = useRef(null);
    //Initial
    useEffect(() => {
        treeList();
        getRoleMenu(roleId);
    }, [])

    //Data
    const [menuTreeList, setMenuTreeList] = useState([]);
    const [roleId, setRoleId] = useState(route.state.roleId);
    const [menuId, setMenuId] = useState([]);
    const [info, setInfo] = useState(null);

    //Methods
    const treeList=()=>{
        menuServices.fetchTreeList().then(response => {
            let tempList = response.data;
            for(let i =0;i<tempList.length;i++){
                tempList[i]['key'] = tempList[i].id;
                for(let j = 0;j<tempList[i].children.length;j++){
                    tempList[i].children[j]['key'] = tempList[i].children[j].id;
                }
            }
            setMenuTreeList(tempList);
        });
    }
    const getRoleMenu=(roleId)=>{
        roleServices.listMenuByRole(roleId).then(response=>{
            let menuList = response.data;
            let tempCheckedMenuIds=[];
            if(menuList!=null&&menuList.length>0){
              for(let i=0;i<menuList.length;i++){
                let menu = menuList[i];
                if(menu.parentId!==0){
                    tempCheckedMenuIds.push(menu.id);
                }
              }
            }
            setMenuId(tempCheckedMenuIds);
        });
    }
    const handleSave=()=>{
        let checkedNodes = info;
        let checkedMenuIds=new Set();
        if(checkedNodes!=null&&checkedNodes.length>0){
          for(let i=0;i<checkedNodes.length;i++){
            let checkedNode = checkedNodes[i];
            checkedMenuIds.add(checkedNode.id);
            if(checkedNode.parentId!==0){
              checkedMenuIds.add(checkedNode.parentId);
            }
          }
        }
        confirm({
            title:"Are you sure to assign menu?",
            okText:'Yes',
            okType:'primary',
            onOk(){
                let params = new URLSearchParams();
                params.append("roleId",roleId);
                params.append("menuIds",Array.from(checkedMenuIds));
                roleServices.allocMenu(params).then(response => {
                   message.success("Alloc Success",10);
                    history.back();
                })
            },
            onCancel(){}
        });
    }
    const handleClear=()=>{
        setMenuId([]);
    }
    const onCheck=(e,info)=>{
        setMenuId(e);
        setInfo(info.checkedNodes);
    }

    return(
       <Card className="form-container">
           <Tree ref={tree} checkable checkedKeys={menuId}
           treeData={menuTreeList} onCheck={onCheck}/>
           <div style={{marginTop:'20px',alignContent:'center'}}>
                <Button type="primary" onClick={handleSave}>Save</Button>
                <Button onClick={handleClear}>Clear</Button>
           </div>
       </Card>
    )
}
export default AllocMenu;