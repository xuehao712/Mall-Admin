import { Card, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';

function ReturnApplyDetail(){
    
    
    return(
        <div class="detail-container">
            <Card>
                <span className="font-title-medium">Return Product</span>
                <TableContainer component={Paper}>
                    <Table class="standard-margin">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" width="160">Product Image</TableCell>
                                <TableCell align="center">Product Name</TableCell>
                                <TableCell align="center" width="180">Price/Product No.</TableCell>
                                <TableCell align="center" width="180">Attribute</TableCell>
                                <TableCell align="center" width="100">Quantity</TableCell>
                                <TableCell align="center" width="100">Total Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {scope.row.map((res)=>(
                                <TableRow key={res.name}>
                                    <TableCell component="th" scope="row">
                                        <img style={{height:'80px'}} src={res.productPic}/>
                                    </TableCell>
                                    <TableCell>
                                        <span className="font-small">{res.productName}</span><br/>
                                        <span className="font-small">Brand:{res.productBrand}</span>
                                    </TableCell>
                                    <TableCell >
                                        <span className="font-small">Price:${res.productRealPrice}</span><br/>
                                        <span className="font-small">货号：NO.{res.productId}</span>
                                    </TableCell>
                                    <TableCell>
                                        {res.productAttr}
                                    </TableCell>
                                    <TableCell>
                                        {res.productCount}
                                    </TableCell>
                                    <TableCell>
                                        ${totalAmount}
                                    </TableCell>
                                </TableRow>))
                            }
                        </TableBody>
                        <TableFooter>
                            <div style={{float:'right',marginTop:'15px',marginBottom:'15px'}}>
                                <span className="font-title-medium">Total:</span>
                                <span className="font-title-medium color-danger">${totalAmount}</span>
                            </div>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Card>
        </div>
    )
}
export { ReturnApplyDetail };