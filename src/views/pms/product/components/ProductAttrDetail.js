import React, {useState, useEffect} from 'react';
import { Card, Checkbox, Form, Select } from 'antd';
import { CheckBox } from '@material-ui/icons';

const { Option } = Select;
function ProductAttrDetail(){
    const [form] = Form.useForm();
    
    return(
        <div style={{marginTop:'50px'}}>
            <Form form={form} style={{width:'720px'}} size="small">
                <Form.Item>
                    <Select value={value.productAttributeCategoryId} placeholder="Please select attr type"
                    onChange={handleProductAttrChange}>
                        {productAttributeCategoryOptions.map((item)=>{
                            return <Option key={item.value} value={item.value}>{item.label}</Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="Product Attr: ">
                    <Card className="cardBg">
                        {selectProductAttr.map((item,index)=>{
                            return (
                                <div>
                                    {productAttr.name}:
                                    <div>
                                        {productAttr.handAddStatus===0?
                                        (<Checkbox.Group options={getInputListArr(productAttr.inputList)} value={selectProductAttr[idx].values}>                                     
                                        </Checkbox.Group>):
                                        (<Checkbox.Group value={selectProductAttr[idx].values}>
                                            
                                        </Checkbox.Group>)}
                                    </div>
                                </div>
                                )
                        })}
                    </Card>
                </Form.Item>
            </Form>
        </div>
    )
}
export default ProductAttrDetail ;