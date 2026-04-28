// Promise is not defined in IE so xlsx-populate uses a polyfill via JSZip.
var Promise = XlsxPopulate.Promise;

const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
    const byteCharacters = window.atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

function getWorkbook(rptUrl) {
        
        return new Promise(function (resolve, reject) {
            var req = new XMLHttpRequest();
            var url = rptUrl;
            req.open("GET", url, true);
            req.responseType = "arraybuffer";
            req.onreadystatechange = function () {
                if (req.readyState === 4){
                    if (req.status === 200) {
                        resolve(XlsxPopulate.fromDataAsync(req.response));
                    } else {
                        reject("Received a " + req.status + " HTTP code.");
                    }
                }
            };

            req.send();
        });
    
}
 

function generaterptRecon(data,rpturl) {

    

    return getWorkbook(rpturl)
        .then(function (workbook) {
   
            //populate fields in xlsx

            var linectr=2;
            var type="";
            //check if not huawei report
            // console.log(data);
            if (rpturl=='./forms/rptHuawei/rptHuawei.xlsx'){
                linectr=2

                data.summary.records.forEach(  function (item, index) {
                    //	SO_Qty_LAZADA	TW_LZ_QTY(Uploaded Lazada)	total_SO_QTY
                    workbook.sheet(0).cell("A"+linectr).value(item.Product);
                    workbook.sheet(0).cell("B"+linectr).value(parseFloat(item.SRP));
                    workbook.sheet(0).cell("C"+linectr).value(parseFloat(item.Promo_Price));
                    workbook.sheet(0).cell("D"+linectr).value(parseFloat(item.Discount_Percent));
                    workbook.sheet(0).cell("E"+linectr).value(parseFloat((item.unit_incentive === null ? 0: item.unit_incentive )));
                    workbook.sheet(0).cell("F"+linectr).value(parseFloat((item.incentive_amount === null ? 0: item.incentive_amount )));
                    workbook.sheet(0).cell("G"+linectr).value(parseFloat((item.SO_target === null ? 0: item.SO_target )));
                    workbook.sheet(0).cell("H"+linectr).value(parseFloat((item.SO_Qty_HUAWEI_STORE === null ? 0: item.SO_Qty_HUAWEI_STORE )));
                    workbook.sheet(0).cell("I"+linectr).value(parseFloat((item.TW_VM_QTY === null ? 0: item.TW_VM_QTY )));
                    workbook.sheet(0).cell("J"+linectr).value(parseFloat(parseFloat((item.SO_Qty_SHOPEE === null ? 0: item.SO_Qty_SHOPEE ))));
                    workbook.sheet(0).cell("K"+linectr).value(parseFloat(parseFloat((item.TW_SH_QTY === null ? 0: item.TW_SH_QTY ))));
                    workbook.sheet(0).cell("L"+linectr).value(parseFloat(parseFloat((item.SO_Qty_LAZADA === null ? 0: item.SO_Qty_LAZADA ))));
                    workbook.sheet(0).cell("M"+linectr).value(parseFloat((item.TW_LZ_QTY === null ? 0: item.TW_LZ_QTY )));
                    workbook.sheet(0).cell("N"+linectr).value(parseFloat((item.total_SO_QTY === null ? 0: item.total_SO_QTY )));
                    
                    linectr=linectr+1;
                });
                linectr=2
                if (data.vmdetails.records){
                    data.vmdetails.records.forEach(  function (item, index) {
                        //VM_Order_status					
                        workbook.sheet(1).cell("A"+linectr).value(item.Product);
                        workbook.sheet(1).cell("B"+linectr).value(parseFloat(item.SRP));
                        workbook.sheet(1).cell("C"+linectr).value(parseFloat(item.Promo_Price));
                        workbook.sheet(1).cell("D"+linectr).value(parseFloat((item.unit_incentive === null ? 0: item.unit_incentive )));
                        workbook.sheet(1).cell("E"+linectr).value(parseFloat((item.incentive_amount === null ? 0: item.incentive_amount )));
                        workbook.sheet(1).cell("F"+linectr).value(item.remark);
                        workbook.sheet(1).cell("G"+linectr).value(item.Prod_Model_Name);
                        workbook.sheet(1).cell("H"+linectr).value(item.Front_system_order_No);
                        workbook.sheet(1).cell("I"+linectr).value(parseFloat((item.VM_Product_unit_price === null ? 0: item.VM_Product_unit_price ))); 
                        workbook.sheet(1).cell("J"+linectr).value(parseFloat((item.VM_Transaction_price === null ? 0: item.VM_Transaction_price )));
                        workbook.sheet(1).cell("K"+linectr).value(parseFloat((item.Coupon_amount === null ? 0: item.Coupon_amount )));
                        workbook.sheet(1).cell("L"+linectr).value(item.VM_Order_status);
                        workbook.sheet(1).cell("M"+linectr).value(item.VM_OrderDateTime);
                        
                      
                        linectr=linectr+1;
                    });
                }
                linectr=2
                if (data.shdetails.records){
                    data.shdetails.records.forEach(  function (item, index) {
                        //	SH_Order_Status SH_Seller_VoucherPHP			
                        workbook.sheet(2).cell("A"+linectr).value(item.Product);
                        workbook.sheet(2).cell("B"+linectr).value(parseFloat(item.SRP));
                        workbook.sheet(2).cell("C"+linectr).value(parseFloat(item.Promo_Price));
                        workbook.sheet(2).cell("D"+linectr).value(parseFloat((item.unit_incentive === null ? 0: item.unit_incentive )));
                        workbook.sheet(2).cell("E"+linectr).value(parseFloat((item.incentive_amount === null ? 0: item.incentive_amount )));
                        workbook.sheet(2).cell("F"+linectr).value(item.remark);
                        workbook.sheet(2).cell("G"+linectr).value(item.Prod_Model_Name);
                        workbook.sheet(2).cell("H"+linectr).value(item.Order_ID);
                        workbook.sheet(2).cell("I"+linectr).value(parseFloat((item.SH_Original_Price === null ? 0: item.SH_Original_Price ))); 
                        workbook.sheet(2).cell("J"+linectr).value(parseFloat((item.SH_Deal_Price === null ? 0: item.SH_Deal_Price )));
                        workbook.sheet(2).cell("K"+linectr).value(parseFloat((item.SH_Shopee_RebatePHP === null ? 0: item.SH_Shopee_RebatePHP )));
                        workbook.sheet(2).cell("L"+linectr).value(item.SH_Order_Status);
                        workbook.sheet(2).cell("M"+linectr).value(parseFloat((item.SH_Seller_VoucherPHP === null ? 0: item.SH_Seller_VoucherPHP )));
                        workbook.sheet(2).cell("N"+linectr).value(item.SH_OrderDateTime);
                        linectr=linectr+1;
                    });
                }
                
                linectr=2
                if (data.lzdetails.records){
                    data.lzdetails.records.forEach(  function (item, index) {
                        //  LZ_status,  LZ_sellerDiscountTotal		
                        workbook.sheet(3).cell("A"+linectr).value(item.Product);
                        workbook.sheet(3).cell("B"+linectr).value(parseFloat(item.SRP));
                        workbook.sheet(3).cell("C"+linectr).value(parseFloat(item.Promo_Price));
                        workbook.sheet(3).cell("D"+linectr).value(parseFloat((item.unit_incentive === null ? 0: item.unit_incentive )));
                        workbook.sheet(3).cell("E"+linectr).value(parseFloat((item.incentive_amount === null ? 0: item.incentive_amount )));
                        workbook.sheet(3).cell("F"+linectr).value(item.remark);
                        workbook.sheet(3).cell("G"+linectr).value(item.Prod_Model_Name);
                        workbook.sheet(3).cell("H"+linectr).value(item.orderNumber);
                        workbook.sheet(3).cell("I"+linectr).value(parseFloat((item.LZ_unitPrice === null ? 0: item.LZ_unitPrice ))); 
                        workbook.sheet(3).cell("J"+linectr).value(parseFloat((item.LZ_paidPrice === null ? 0: item.LZ_paidPrice )));
                        workbook.sheet(3).cell("K"+linectr).value(item.LZ_status);
                        workbook.sheet(3).cell("L"+linectr).value(parseFloat((item.LZ_sellerDiscountTotal === null ? 0: item.LZ_sellerDiscountTotal )));
                        workbook.sheet(3).cell("M"+linectr).value(item.LZ_OrderDateTime); 
                        linectr=linectr+1;
                    });
                }
                
            } else if (rpturl=='./forms/rptagenda/rptagenda.xlsx') {
                

                data.agenda.forEach(  function (item, index) {
                    //	SO_Qty_LAZADA	TW_LZ_QTY(Uploaded Lazada)	total_SO_QTY
                    workbook.sheet(0).cell("A1").value(item.couriername);
                    workbook.sheet(0).cell("D2").value(item.transdate);
                    workbook.sheet(0).cell("D3").value(item.fmodel);
                    workbook.sheet(0).cell("D4").value(item.fplateno);
                    workbook.sheet(0).cell("D5").value(item.driver);
                    workbook.sheet(0).cell("D6").value(item.driver2);
                    workbook.sheet(0).cell("D7").value(item.driver3);
                    workbook.sheet(0).cell("D8").value(item.tripnumber);
                    //
                   
                });
                linectr=10;
                if (data.dispatchagenda){
                    data.dispatchagenda.forEach(  function (item, index) {
                        //VM_Order_status					
                        workbook.sheet(0).cell("A"+linectr).value(item.drnumber);
                        workbook.sheet(0).cell("B"+linectr).value(item.customername);
                        workbook.sheet(0).cell("C"+linectr).value(item.quantity);
                        workbook.sheet(0).cell("D"+linectr).value(item.destinationaddress);
                        workbook.sheet(0).cell("E"+linectr).value(item.contactperson);
                        workbook.sheet(0).cell("F"+linectr).value(item.contactnumber);
                        workbook.sheet(0).cell("G"+linectr).value(item.specialinstructions);
                        
                        // workbook.sheet(1).cell("B"+linectr).value(parseFloat(item.SRP));
                        // workbook.sheet(1).cell("C"+linectr).value(parseFloat(item.Promo_Price));
                        // workbook.sheet(1).cell("D"+linectr).value(parseFloat((item.unit_incentive === null ? 0: item.unit_incentive )));
                        // workbook.sheet(1).cell("E"+linectr).value(parseFloat((item.incentive_amount === null ? 0: item.incentive_amount )));
                        // workbook.sheet(1).cell("F"+linectr).value(item.remark);
                        // workbook.sheet(1).cell("G"+linectr).value(item.Prod_Model_Name);
                        // workbook.sheet(1).cell("H"+linectr).value(item.Front_system_order_No);
                        // workbook.sheet(1).cell("I"+linectr).value(parseFloat((item.VM_Product_unit_price === null ? 0: item.VM_Product_unit_price ))); 
                        // workbook.sheet(1).cell("J"+linectr).value(parseFloat((item.VM_Transaction_price === null ? 0: item.VM_Transaction_price )));
                        // workbook.sheet(1).cell("K"+linectr).value(parseFloat((item.Coupon_amount === null ? 0: item.Coupon_amount )));
                        // workbook.sheet(1).cell("L"+linectr).value(item.VM_Order_status);
                        // workbook.sheet(1).cell("M"+linectr).value(item.VM_OrderDateTime);
                        
                      
                        linectr=linectr+1;
                    });
                }
            } else if (rpturl=='./forms/rptagenda/rptdailyagenda.xlsx') {
                

                
                linectr=4;
                if (data){
                    data.forEach(  function (item, index) {
                        //VM_Order_status		
                        workbook.sheet(0).cell("A1").value(item.transdate);			
                        workbook.sheet(0).cell("A"+linectr).value(item.fmodel);
                        workbook.sheet(0).cell("B"+linectr).value(item.fplateno);
                        workbook.sheet(0).cell("C"+linectr).value(item.tripnumber);
                        workbook.sheet(0).cell("D"+linectr).value(item.drnumber);
                        workbook.sheet(0).cell("E"+linectr).value(item.deliverystatus);
                        workbook.sheet(0).cell("F"+linectr).value(item.customername);
                        workbook.sheet(0).cell("G"+linectr).value(item.quantity);
                        workbook.sheet(0).cell("H"+linectr).value(item.destinationaddress);
                        workbook.sheet(0).cell("I"+linectr).value(item.contactperson);
                        workbook.sheet(0).cell("J"+linectr).value(item.contactnumber);
                        workbook.sheet(0).cell("K"+linectr).value(item.deliverynotes);
                        workbook.sheet(0).cell("L"+linectr).value(item.arrivaltime);
                        workbook.sheet(0).cell("M"+linectr).value(item.departuretime);
                        workbook.sheet(0).cell("N"+linectr).value(item.dliveryduration);
                   
                        
                      
                        linectr=linectr+1;
                    });
                }
            } else {
                linectr=2
                data.forEach(  function (item, index) {
               
                    //RPT Recon File
                    if (rpturl=="./forms/rptRecon/rptRecon.xlsx") {
                        workbook.sheet(0).cell("A"+linectr).value(item.Processing_Date);
                        // if (item.Payment_mode=="Online payment") {
                        //     workbook.sheet(0).cell("B"+linectr).value("Paynamics");
                        // } else {
                        //     workbook.sheet(0).cell("B"+linectr).value("LBC");
                        // }
                        workbook.sheet(0).cell("B"+linectr).value(item.Payment_mode);
                        workbook.sheet(0).cell("C"+linectr).value(item.Customer_Order);
                        workbook.sheet(0).cell("D"+linectr).value(item.Carrier_Order);
                        workbook.sheet(0).cell("E"+linectr).value(item.Payment_mode);
                        workbook.sheet(0).cell("F"+linectr).value(item.EAN);
                        workbook.sheet(0).cell("G"+linectr).value(item.SN);
                        workbook.sheet(0).cell("H"+linectr).value(item.IMEI1);
                        workbook.sheet(0).cell("I"+linectr).value(item.Commodity_Desc);
                        workbook.sheet(0).cell("J"+linectr).value(item.Order_Status);
                        workbook.sheet(0).cell("K"+linectr).value(item.Transaction_Price);
                        workbook.sheet(0).cell("L"+linectr).value(parseFloat(item.Coupon_amount));
                        workbook.sheet(0).cell("M"+linectr).value(item.REFTOPAYNAMICS);
                        workbook.sheet(0).cell("N"+linectr).value(parseFloat(item.PAYNAMICS_AMT));
                        workbook.sheet(0).cell("O"+linectr).value(parseFloat(item.Metrobank_AMT));
                        workbook.sheet(0).cell("P"+linectr).value(parseFloat(item.COD_AMOUNT));
                        workbook.sheet(0).cell("Q"+linectr).value(item.REMITTANCESTATUS);
                        
                        
                        
                        
                    }
                    if (rpturl=="./forms/rptIBSUpload/rptIBSUpload.xlsx") {
        
                        workbook.sheet(0).cell("A"+linectr).value(item.Processing_Date);
                        workbook.sheet(0).cell("B"+linectr).value(item.Customer_Name);
                        workbook.sheet(0).cell("C"+linectr).value(item.Customer_Order);
                        workbook.sheet(0).cell("D"+linectr).value(item.Carrier_Order);
                        workbook.sheet(0).cell("E"+linectr).value(item.Payment_mode);
                        workbook.sheet(0).cell("E"+linectr).value(item.Payment_mode);
                        workbook.sheet(0).cell("F"+linectr).value(parseFloat(item.User_actual_payment_amount));
                        workbook.sheet(0).cell("G"+linectr).value(item.EAN);
                        workbook.sheet(0).cell("H"+linectr).value(item.SN);
                        workbook.sheet(0).cell("I"+linectr).value(item.IMEI1);
                        workbook.sheet(0).cell("J"+linectr).value(item.Commodity_Desc);
                        workbook.sheet(0).cell("K"+linectr).value(parseFloat(item.Order_Qty));
                        workbook.sheet(0).cell("L"+linectr).value(parseFloat(item.Product_Price));
                        workbook.sheet(0).cell("M"+linectr).value(parseFloat(item.Transaction_Price));
                        workbook.sheet(0).cell("N"+linectr).value(parseFloat(item.Coupon_amount));
                        workbook.sheet(0).cell("O"+linectr).value(parseFloat(item.Freight_amount));
                        workbook.sheet(0).cell("P"+linectr).value(item.DR_);
                        workbook.sheet(0).cell("Q"+linectr).value(item.REQUESTID);
                        workbook.sheet(0).cell("R"+linectr).value(item.PROCAUTHCODE);
                        workbook.sheet(0).cell("S"+linectr).value(item.RESPONSETIMESTAMP);
                        workbook.sheet(0).cell("T"+linectr).value(item.CARDHOLDER);
                        
                        // bp.REQUESTID,
                        // bp.PROCAUTHCODE,
                        // bp.RESPONSETIMESTAMP,
                        // bp.CARDHOLDER
                        
                        
                    }
                    if (rpturl=="./forms/rptBillRecon/rptBillRecon.xlsx") {
                        
    
                        workbook.sheet(0).cell("A"+linectr).value(item.TRANS_YEAR);
                        workbook.sheet(0).cell("B"+linectr).value(item.TRANS_MONTH);             
                        workbook.sheet(0).cell("C"+linectr).value(item.TRANS_MONTHNAME);
                        workbook.sheet(0).cell("D"+linectr).value(item.Validation_Time);
                        workbook.sheet(0).cell("E"+linectr).value(item.Customer_Order_Number);
                        workbook.sheet(0).cell("F"+linectr).value(item.TRACKINGNUMBER);
                        workbook.sheet(0).cell("G"+linectr).value(parseFloat(item.Order_item_Count));
                        workbook.sheet(0).cell("H"+linectr).value(parseFloat(item.Commodity_price));
                        workbook.sheet(0).cell("I"+linectr).value(parseFloat(item.Coupon_amount));
                        workbook.sheet(0).cell("J"+linectr).value(parseFloat(item.Discount_amount));
                        workbook.sheet(0).cell("K"+linectr).value(item.REMITTANCESTATUS);
                        workbook.sheet(0).cell("L"+linectr).value(parseFloat(item.COD_AMOUNT));
                        workbook.sheet(0).cell("M"+linectr).value(parseFloat(item.COD_FEE));
                        workbook.sheet(0).cell("N"+linectr).value(parseFloat(item.FREIGHT_FEE));
    
                        workbook.sheet(0).cell("O"+linectr).value(parseFloat(item.BIS_AMOUNT_PAYNAMICS));
                        workbook.sheet(0).cell("P"+linectr).value(parseFloat(item.PAYNAMICS_FEE));
                        workbook.sheet(0).cell("Q"+linectr).value(parseFloat(item.METROBANK_GROSS));
                        workbook.sheet(0).cell("R"+linectr).value(parseFloat(item.METROBANK_PAID));
                        workbook.sheet(0).cell("S"+linectr).value(parseFloat(item.METROBANK_FEE));
                        workbook.sheet(0).cell("T"+linectr).value(parseFloat(item.TOTAL_FEES));
                        workbook.sheet(0).cell("U"+linectr).value(item.FEES_VS_PRICE_PERCENTAGE);
                        workbook.sheet(0).cell("V"+linectr).value(item.REQUESTID);
                        workbook.sheet(0).cell("X"+linectr).value(item.PROCAUTHCODE);
                        workbook.sheet(0).cell("Y"+linectr).value(item.RESPONSETIMESTAMP);
                        workbook.sheet(0).cell("Z"+linectr).value(item.CARDHOLDER);
    
                    }
                    if (rpturl=="./forms/rptPaynamics/rptPaynamics.xlsx") {
                        
                       // 												
    
    
                        // workbook.sheet(0).cell("A"+linectr).value(item.YEAR);
                        // workbook.sheet(0).cell("B"+linectr).value(item.MONTH);             
                        // workbook.sheet(0).cell("C"+linectr).value(item.MONTH_NAME);
                        workbook.sheet(0).cell("A"+linectr).value(item.Order_Number);
                        workbook.sheet(0).cell("B"+linectr).value(item.Transaction_DATE);
                        workbook.sheet(0).cell("C"+linectr).value(item.REQUESTID);
    
                        workbook.sheet(0).cell("D"+linectr).value(item.PROCID);
                        workbook.sheet(0).cell("E"+linectr).value(parseFloat(item.rate));
                        workbook.sheet(0).cell("F"+linectr).value(parseFloat(item.amount));
                        workbook.sheet(0).cell("G"+linectr).value(parseFloat(item.PAYNAMICS_Fee));
                        workbook.sheet(0).cell("H"+linectr).value(item.TRX_RECEIVEDTIMESTAMP);
                        workbook.sheet(0).cell("I"+linectr).value(parseFloat(item.TRX_AMOUNT));
                       
                        workbook.sheet(0).cell("J"+linectr).value(item.Order_Status);
                        workbook.sheet(0).cell("K"+linectr).value(item.Payment_Status);
                        workbook.sheet(0).cell("L"+linectr).value(item.REQUESTID);
                        workbook.sheet(0).cell("M"+linectr).value(item.PROCAUTHCODE);
                        workbook.sheet(0).cell("N"+linectr).value(item.RESPONSETIMESTAMP);
                        workbook.sheet(0).cell("O"+linectr).value(item.CARDHOLDER);
                        workbook.sheet(0).cell("P"+linectr).value(item.Tracking_Number);
                        workbook.sheet(0).cell("Q"+linectr).value(item.TRXTYPE);
                        workbook.sheet(0).cell("R"+linectr).value(item.DR);
                        workbook.sheet(0).cell("S"+linectr).value(item.ORGREQUESTID);
                        workbook.sheet(0).cell("T"+linectr).value(0);
                        workbook.sheet(0).cell("U"+linectr).value(0);
                        workbook.sheet(0).cell("V"+linectr).value(0);
                        workbook.sheet(0).cell("W"+linectr).value(0);
                        workbook.sheet(0).cell("X"+linectr).value(0);
                        
    
    
    
                    }
                    if (rpturl=="./forms/rptPaynamics/rptPaynamicsBilling.xlsx") {
                        
                        // 												
     
     
                         workbook.sheet(0).cell("A"+linectr).value(item.Order_Number);
                         workbook.sheet(0).cell("B"+linectr).value(item.Transaction_DATE);
                         workbook.sheet(0).cell("C"+linectr).value(item.REQUESTID);
                         // workbook.sheet(0).cell("D"+linectr).value(item.BIS_AMT_Paynamics);
                         // workbook.sheet(0).cell("E"+linectr).value(item.BIS_Trans_Date);
     
                         workbook.sheet(0).cell("F"+linectr).value(item.PROCID);
                         workbook.sheet(0).cell("G"+linectr).value(parseFloat(item.rate));
                         workbook.sheet(0).cell("H"+linectr).value(parseFloat(item.amount));
                         workbook.sheet(0).cell("I"+linectr).value(parseFloat(item.PAYNAMICS_Fee));
                        //  workbook.sheet(0).cell("J"+linectr).value(item.TRX_RECEIVEDTIMESTAMP);
                        //  workbook.sheet(0).cell("K"+linectr).value(parseFloat(item.TRX_AMOUNT));
                         // workbook.sheet(0).cell("L"+linectr).value(item.Settle_Date);
                         // workbook.sheet(0).cell("M"+linectr).value(item.Gross);
                         // workbook.sheet(0).cell("N"+linectr).value(item.MDR_Percent);
                         // workbook.sheet(0).cell("O"+linectr).value(item.Metrobank_Fee);
                         // workbook.sheet(0).cell("P"+linectr).value(item.CWT);
                         workbook.sheet(0).cell("Q"+linectr).value(item.Order_Status);
                         workbook.sheet(0).cell("R"+linectr).value(item.Payment_Status);
                         workbook.sheet(0).cell("S"+linectr).value(item.REQUESTID);
                        //  workbook.sheet(0).cell("T"+linectr).value(item.Payment_Status);
                        //  workbook.sheet(0).cell("U"+linectr).value(item.REQUESTID);
                         workbook.sheet(0).cell("T"+linectr).value(item.PROCAUTHCODE);
                         workbook.sheet(0).cell("U"+linectr).value(item.RESPONSETIMESTAMP);
                         workbook.sheet(0).cell("V"+linectr).value(item.CARDHOLDER);
                         workbook.sheet(0).cell("W"+linectr).value(item.Tracking_Number);
                         workbook.sheet(0).cell("X"+linectr).value(item.TRXTYPE);
                         workbook.sheet(0).cell("Y"+linectr).value(item.DR);
                         workbook.sheet(0).cell("Z"+linectr).value(item.ORGREQUESTID);
                         workbook.sheet(0).cell("AA"+linectr).value(item.TRX_RECEIVEDTIMESTAMP);
                         workbook.sheet(0).cell("AB"+linectr).value(item.TRX_AMOUNT);
                         workbook.sheet(0).cell("AC"+linectr).value(item.Settle_Date);
                         workbook.sheet(0).cell("AD"+linectr).value(item.Gross);
                         workbook.sheet(0).cell("AE"+linectr).value(item.MDR_Percent);
                         workbook.sheet(0).cell("AF"+linectr).value(item.Metrobank_Fee);
                         workbook.sheet(0).cell("AG"+linectr).value(item.CWT);
                         workbook.sheet(0).cell("AH"+linectr).value(item.EWT);
                         workbook.sheet(0).cell("AI"+linectr).value(item.Amount_Paid);
                         workbook.sheet(0).cell("AJ"+linectr).value(item.BIS_Amount);
                         
     
                        //								
    
     
                     }
                    if (rpturl=="./forms/rptMetrobank/rptMetrobank.xlsx") {
                        
                        // 												
     
     
                         // workbook.sheet(0).cell("A"+linectr).value(item.YEAR);
                         // workbook.sheet(0).cell("B"+linectr).value(item.MONTH);             
                         // workbook.sheet(0).cell("C"+linectr).value(item.MONTH_NAME);
                         workbook.sheet(0).cell("A"+linectr).value(item.Order_Number);
                         workbook.sheet(0).cell("B"+linectr).value(item.Transaction_DATE);
                         workbook.sheet(0).cell("C"+linectr).value(item.REQUESTID);
                        
     
                         workbook.sheet(0).cell("D"+linectr).value(item.PROCID);
                         workbook.sheet(0).cell("E"+linectr).value(parseFloat(item.rate));
                         workbook.sheet(0).cell("F"+linectr).value(parseFloat(item.amount));
                         workbook.sheet(0).cell("G"+linectr).value(parseFloat(item.Metrobank_Fee));
                         workbook.sheet(0).cell("H"+linectr).value(item.TRX_RECEIVEDTIMESTAMP);
                         workbook.sheet(0).cell("I"+linectr).value(parseFloat(item.AMOUNT_Paid));
                        
                         workbook.sheet(0).cell("J"+linectr).value(item.Order_Status);
                         workbook.sheet(0).cell("K"+linectr).value(item.Payment_Status);
                         workbook.sheet(0).cell("L"+linectr).value(item.REQUESTID);
                         workbook.sheet(0).cell("M"+linectr).value(item.AUTH_CODE);
                         workbook.sheet(0).cell("N"+linectr).value(item.RESPONSETIMESTAMP);
                         workbook.sheet(0).cell("O"+linectr).value(item.CARDHOLDER);
                         workbook.sheet(0).cell("P"+linectr).value(item.Tracking_Number);
                         workbook.sheet(0).cell("Q"+linectr).value(item.TRXTYPE);
                         workbook.sheet(0).cell("R"+linectr).value(item.DR);
                         workbook.sheet(0).cell("S"+linectr).value(parseFloat(item.EWT));
                         workbook.sheet(0).cell("T"+linectr).value(parseFloat(item.Gross));
                         workbook.sheet(0).cell("U"+linectr).value(parseFloat(item.EWT)+parseFloat(item.Metrobank_Fee));
                         workbook.sheet(0).cell("V"+linectr).value(0);
                         workbook.sheet(0).cell("W"+linectr).value(0);
     
     
     
                     }
                     if (rpturl=="./forms/rptLBCBilling/rptLBCRemittance.xlsx") {
                        
                         workbook.sheet(0).cell("A"+linectr).value(linectr-1);
                         workbook.sheet(0).cell("B"+linectr).value(item.Processing_time);
                         workbook.sheet(0).cell("C"+linectr).value(item.Customer_Name);
                         workbook.sheet(0).cell("D"+linectr).value(item.order_number);
                         workbook.sheet(0).cell("E"+linectr).value(item.TRACKINGNUMBER);
                         workbook.sheet(0).cell("F"+linectr).value(item.Payment_Mode);
                         workbook.sheet(0).cell("G"+linectr).value(parseFloat(item.Order_Qty));
                         workbook.sheet(0).cell("H"+linectr).value(parseFloat(item.Unit_Price));
                         workbook.sheet(0).cell("I"+linectr).value(parseFloat(item.Coupon_amount));
                         workbook.sheet(0).cell("J"+linectr).value(parseFloat(item.Unit_Price)-parseFloat(item.Coupon_amount));
                         workbook.sheet(0).cell("K"+linectr).value(parseFloat(item.LBC));
                        
                         workbook.sheet(0).cell("L"+linectr).value(item.DR);
                         workbook.sheet(0).cell("M"+linectr).value(item.Order_status_value);
                         workbook.sheet(0).cell("N"+linectr).value(item.amount);
                       
    
    
    
                         workbook.sheet(0).cell("O"+linectr).value(item.Consignee_1);
                         workbook.sheet(0).cell("P"+linectr).value(item.Area);
                         workbook.sheet(0).cell("Q"+linectr).value(item.Consignee_Address);
                         workbook.sheet(0).cell("R"+linectr).value(parseFloat(item.Volume_Weight));
                         workbook.sheet(0).cell("S"+linectr).value(parseFloat(item.ACTUAL_WEIGHT));
                         workbook.sheet(0).cell("T"+linectr).value(parseFloat(item.Chargeable_Weight));
                         workbook.sheet(0).cell("U"+linectr).value(parseFloat(item.COD_AMOUNT));
                         workbook.sheet(0).cell("V"+linectr).value(parseFloat(item.DECLARED_VALUE));
                         workbook.sheet(0).cell("W"+linectr).value(item.Commodity_Desc);
                         workbook.sheet(0).cell("X"+linectr).value(parseFloat(item.Freight));
                         workbook.sheet(0).cell("Y"+linectr).value(parseFloat(item.VALUATION));
                         workbook.sheet(0).cell("Z"+linectr).value(parseFloat(item.COD));
                         workbook.sheet(0).cell("AA"+linectr).value(parseFloat(item.VAT));
                         workbook.sheet(0).cell("AB"+linectr).value(parseFloat(item.TOTAL_Amount));
    
     
     
     
                     }
                     if (rpturl=="./forms/rpt2GoBilling/rpt2GORemittance.xlsx") {
                        
                        workbook.sheet(0).cell("A"+linectr).value(linectr-1);
                        workbook.sheet(0).cell("B"+linectr).value(item.Processing_time);
                        workbook.sheet(0).cell("C"+linectr).value(item.Customer_Name);
                        workbook.sheet(0).cell("D"+linectr).value(item.order_number);
                        workbook.sheet(0).cell("E"+linectr).value(item.TRACKINGNUMBER);
                        workbook.sheet(0).cell("F"+linectr).value(item.Payment_Mode);
                        workbook.sheet(0).cell("G"+linectr).value(parseFloat(item.Order_Qty));
                        workbook.sheet(0).cell("H"+linectr).value(parseFloat(item.Unit_Price));
                        workbook.sheet(0).cell("I"+linectr).value(parseFloat(item.Coupon_amount));
                        workbook.sheet(0).cell("J"+linectr).value(parseFloat(item.Unit_Price)-parseFloat(item.Coupon_amount));
                        workbook.sheet(0).cell("K"+linectr).value(parseFloat(item.TwoGo));
                       
                        workbook.sheet(0).cell("L"+linectr).value(item.DR);
                        workbook.sheet(0).cell("M"+linectr).value(item.Order_status_value);
                        workbook.sheet(0).cell("N"+linectr).value(item.amount);
    
                        workbook.sheet(0).cell("O"+linectr).value(item.Consignee_1);
                        workbook.sheet(0).cell("P"+linectr).value(item.Area);
                        workbook.sheet(0).cell("Q"+linectr).value(item.Consignee_Address);
                        workbook.sheet(0).cell("R"+linectr).value(parseFloat(item.Volume_Weight));
                        workbook.sheet(0).cell("S"+linectr).value(parseFloat(item.ACTUAL_WEIGHT));
                        workbook.sheet(0).cell("T"+linectr).value(parseFloat(item.Chargeable_Weight));
                        workbook.sheet(0).cell("U"+linectr).value(parseFloat(item.COD_AMOUNT));
                        workbook.sheet(0).cell("V"+linectr).value(parseFloat(item.DECLARED_VALUE));
                        workbook.sheet(0).cell("W"+linectr).value(item.Commodity_Desc);
                        workbook.sheet(0).cell("X"+linectr).value(parseFloat(item.Freight));
                        workbook.sheet(0).cell("Y"+linectr).value(parseFloat(item.VALUATION));
                        workbook.sheet(0).cell("Z"+linectr).value(parseFloat(item.COD));
                        workbook.sheet(0).cell("AA"+linectr).value(parseFloat(item.VAT));
                        workbook.sheet(0).cell("AB"+linectr).value(parseFloat(item.TOTAL_Amount));
                      
                       
    
                        // , 
                        // bl.CNEE_NAME Consignee_1,
                        // bl.DEST Area,
                        // concat(co.Street, " ", co.District, " ", co.City, " " , co.Province)  Consignee_Address, 
                        // dm.WEIGHT Volume_Weight,
                        // bl.ACTUAL_WEIGHT ,
                        // bl.ACTUAL_WEIGHT Chargeable_Weight,
                        // rm.COD_AMOUNT,
                        // dm.DECLARED_VALUE,
                        // co.Commodity_Desc,
                        // bl.WEIGHT_CHARGE Freight,
                        // bl.VALUATION,
                        // 0 COD,
                        // bl.VAT,
                        // bl.CHARGES TOTAL_Amount
               
    
                    }
                    if (rpturl=="./forms/rptPaynamics/rptPaynamicsRefund.xlsx") {
                        
                        // 												
     
     
                         // workbook.sheet(0).cell("A"+linectr).value(item.YEAR);
                         // workbook.sheet(0).cell("B"+linectr).value(item.MONTH);             
                         // workbook.sheet(0).cell("C"+linectr).value(item.MONTH_NAME);
                         workbook.sheet(0).cell("A"+linectr).value(item.Order_Number);
                         workbook.sheet(0).cell("B"+linectr).value(item.Transaction_DATE);
                         workbook.sheet(0).cell("C"+linectr).value(item.REQUESTID);
                         // workbook.sheet(0).cell("D"+linectr).value(item.BIS_AMT_Paynamics);
                         // workbook.sheet(0).cell("E"+linectr).value(item.BIS_Trans_Date);
     
                         workbook.sheet(0).cell("F"+linectr).value(item.PROCID);
                         workbook.sheet(0).cell("G"+linectr).value(parseFloat(item.rate));
                         workbook.sheet(0).cell("H"+linectr).value(parseFloat(item.amount));
                         workbook.sheet(0).cell("I"+linectr).value(parseFloat(item.PAYNAMICS_Fee));
                         workbook.sheet(0).cell("J"+linectr).value(item.TRX_RECEIVEDTIMESTAMP);
                         workbook.sheet(0).cell("K"+linectr).value(parseFloat(item.TRX_AMOUNT));
                         // workbook.sheet(0).cell("L"+linectr).value(item.Settle_Date);
                         // workbook.sheet(0).cell("M"+linectr).value(item.Gross);
                         // workbook.sheet(0).cell("N"+linectr).value(item.MDR_Percent);
                         // workbook.sheet(0).cell("O"+linectr).value(item.Metrobank_Fee);
                         // workbook.sheet(0).cell("P"+linectr).value(item.CWT);
                         // workbook.sheet(0).cell("Q"+linectr).value(item.EWT);
                         // workbook.sheet(0).cell("R"+linectr).value(item.Amount_Paid);
                         workbook.sheet(0).cell("S"+linectr).value(item.Order_Status);
                         workbook.sheet(0).cell("T"+linectr).value(item.Payment_Status);
                         workbook.sheet(0).cell("U"+linectr).value(item.REQUESTID);
                         workbook.sheet(0).cell("V"+linectr).value(item.PROCAUTHCODE);
                         workbook.sheet(0).cell("W"+linectr).value(item.RESPONSETIMESTAMP);
                         workbook.sheet(0).cell("X"+linectr).value(item.CARDHOLDER);
                        //  workbook.sheet(0).cell("Y"+linectr).value(item.Tracking_Number);
     
     
     
                     }
                    if (rpturl=="./forms/rptLBCBilling/rptLBCBilling.xlsx") {
                        
                                                       
     
     
                         workbook.sheet(0).cell("A"+linectr).value(item.Validation_Time);
                         workbook.sheet(0).cell("B"+linectr).value(item.Customer_Order_Number);             
                         workbook.sheet(0).cell("C"+linectr).value(item.TRACKINGNUMBER);
                         workbook.sheet(0).cell("D"+linectr).value(parseFloat(item.Order_item_Count));
                         workbook.sheet(0).cell("E"+linectr).value(parseFloat(item.Commodity_price));
                         workbook.sheet(0).cell("F"+linectr).value(parseFloat(item.Coupon_amount));
                         workbook.sheet(0).cell("G"+linectr).value(parseFloat(item.Discount_amount));
                         workbook.sheet(0).cell("H"+linectr).value(item.REMITTANCESTATUS);
     
                         workbook.sheet(0).cell("I"+linectr).value(parseFloat(item.COD_AMOUNT));
                         workbook.sheet(0).cell("J"+linectr).value(parseFloat(item.COD_FEE));
                         workbook.sheet(0).cell("K"+linectr).value(parseFloat(item.FREIGHT_FEE));
                         workbook.sheet(0).cell("L"+linectr).value(parseFloat(item.BIS_AMOUNT_PAYNAMICS));
                         workbook.sheet(0).cell("M"+linectr).value(parseFloat(item.PAYNAMICS_FEE));
                         workbook.sheet(0).cell("N"+linectr).value(parseFloat(item.PAYNAMICS_PAID_AMT));
                         workbook.sheet(0).cell("O"+linectr).value(parseFloat(item.METROBANK_GROSS));
                         workbook.sheet(0).cell("P"+linectr).value(parseFloat(item.METROBANK_PAID));
                         workbook.sheet(0).cell("Q"+linectr).value(parseFloat(item.METROBANK_FEE));
                         workbook.sheet(0).cell("R"+linectr).value(item.DR);
                         workbook.sheet(0).cell("S"+linectr).value(item.REQUESTID);
                         workbook.sheet(0).cell("T"+linectr).value(item.PROCAUTHCODE);
     
     
     
     
                     }
                     if (rpturl=="./forms/rpt2GoBilling/rpt2GoBilling.xlsx") {
                        
                        
    
                        var Commodity_price = parseFloat(item.Commodity_price);
    
                        // workbook.sheet(0).cell("F"+linectr).value(item.Coupon_amount);
                        // workbook.sheet(0).cell("G"+linectr).value(item.Discount_amount);
                        // workbook.sheet(0).cell("H"+linectr).value(item.REMITTANCESTATUS);
    
                        var COD_AMOUNT=parseFloat(item.COD_AMOUNT);
    
                        // workbook.sheet(0).cell("J"+linectr).value(item.COD_FEE);
                        // workbook.sheet(0).cell("K"+linectr).value(item.FREIGHT_FEE);
                        // workbook.sheet(0).cell("L"+linectr).value(item.BIS_AMOUNT_PAYNAMICS);
                        // workbook.sheet(0).cell("M"+linectr).value(item.PAYNAMICS_FEE);
                        // workbook.sheet(0).cell("N"+linectr).value(item.PAYNAMICS_PAID_AMT);
                        // workbook.sheet(0).cell("O"+linectr).value(item.METROBANK_GROSS);
                        // workbook.sheet(0).cell("P"+linectr).value(item.METROBANK_PAID);
                        // workbook.sheet(0).cell("Q"+linectr).value(item.METROBANK_FEE);
                        // workbook.sheet(0).cell("R"+linectr).value(item.DR);
    
    
    
    
    
     
                        workbook.sheet(0).cell("A"+linectr).value(item.Validation_Time);
                        workbook.sheet(0).cell("B"+linectr).value(item.Customer_Order_Number);             
                        workbook.sheet(0).cell("C"+linectr).value(item.TRACKINGNUMBER);
                        workbook.sheet(0).cell("D"+linectr).value(parseFloat(item.Order_item_Count));
                        workbook.sheet(0).cell("E"+linectr).value(parseFloat(Commodity_price));
                        workbook.sheet(0).cell("F"+linectr).value(parseFloat(item.Coupon_amount));
                        workbook.sheet(0).cell("G"+linectr).value(parseFloat(item.Discount_amount));
                        workbook.sheet(0).cell("H"+linectr).value(item.REMITTANCESTATUS);
    
                        workbook.sheet(0).cell("I"+linectr).value(parseFloat(COD_AMOUNT));
                        workbook.sheet(0).cell("J"+linectr).value(parseFloat(item.COD_FEE));
                        workbook.sheet(0).cell("K"+linectr).value(parseFloat(item.FREIGHT_FEE));
                        workbook.sheet(0).cell("L"+linectr).value(parseFloat(item.BIS_AMOUNT_PAYNAMICS));
                        workbook.sheet(0).cell("M"+linectr).value(parseFloat(item.PAYNAMICS_FEE));
                        workbook.sheet(0).cell("N"+linectr).value(parseFloat(item.PAYNAMICS_PAID_AMT));
                        workbook.sheet(0).cell("O"+linectr).value(parseFloat(item.METROBANK_GROSS));
                        workbook.sheet(0).cell("P"+linectr).value(parseFloat(item.METROBANK_PAID));
                        workbook.sheet(0).cell("Q"+linectr).value(parseFloat(item.METROBANK_FEE));
                        workbook.sheet(0).cell("R"+linectr).value(item.DR);
                        workbook.sheet(0).cell("S"+linectr).value(item.REQUESTID);
                        workbook.sheet(0).cell("T"+linectr).value(item.PROCAUTHCODE);
                        workbook.sheet(0).cell("U"+linectr).value(item.RESPONSETIMESTAMP);
                        workbook.sheet(0).cell("V"+linectr).value(item.CARDHOLDER);
    
    
    
    
                    }
                     if (rpturl=="./forms/rptLBCBilling/rptLBCRTS.xlsx") {
                        
                                                       
                       
                        workbook.sheet(0).cell("A"+linectr).value(item.TRANSDATE);
                        workbook.sheet(0).cell("B"+linectr).value(item.TRACKINGNUMBER);             
                        workbook.sheet(0).cell("C"+linectr).value(parseFloat(item.Freight));
                        workbook.sheet(0).cell("D"+linectr).value(parseFloat(item.COD));
                        workbook.sheet(0).cell("E"+linectr).value(parseFloat(item.Valuation));
                        workbook.sheet(0).cell("F"+linectr).value(parseFloat(item.Vat));
                        workbook.sheet(0).cell("G"+linectr).value(parseFloat(item.Total_Amount));
    
    
    
                    }
                     if (rpturl=="./forms/rptLBCBilling/rptLBCBilling2.xlsx") {
                        
                      
     
     
                        workbook.sheet(0).cell("A"+linectr).value(linectr-1);
                        workbook.sheet(0).cell("B"+linectr).value(item.Tracking_Number);             
                        workbook.sheet(0).cell("C"+linectr).value(item.Transaction_Date);
                        workbook.sheet(0).cell("D"+linectr).value(item.Consignee_1);
                        workbook.sheet(0).cell("E"+linectr).value(item.Area);
                        workbook.sheet(0).cell("F"+linectr).value(item.Consignee_Address);
                        workbook.sheet(0).cell("G"+linectr).value(parseFloat(item.Volume_Weight));
                        workbook.sheet(0).cell("H"+linectr).value(parseFloat(item.Actual_Weight));
    
                        workbook.sheet(0).cell("I"+linectr).value(parseFloat(item.Chargeable_Weight));
                        workbook.sheet(0).cell("J"+linectr).value(parseFloat(item.COD_AMOUNT));
                        workbook.sheet(0).cell("K"+linectr).value(parseFloat(item.Declared_Value));
                        workbook.sheet(0).cell("L"+linectr).value(item.Commodity);
                        workbook.sheet(0).cell("M"+linectr).value(parseFloat(item.Freight));
                        workbook.sheet(0).cell("N"+linectr).value(parseFloat(item.Valuation));
                        workbook.sheet(0).cell("O"+linectr).value(parseFloat(item.COD));
                        workbook.sheet(0).cell("P"+linectr).value(parseFloat(item.Vat));
                        workbook.sheet(0).cell("Q"+linectr).value(parseFloat(item.Total_Amount));
                        workbook.sheet(0).cell("R"+linectr).value(item.Customer_Order_Number);
                        workbook.sheet(0).cell("S"+linectr).value(item.DR);
    
    
    
    
                    }
                    if (rpturl=="./forms/rpt2GoBilling/rpt2GOIBSUpload.xlsx") {
                        
                      
     
     
                        workbook.sheet(0).cell("A"+linectr).value(linectr-1);
                        workbook.sheet(0).cell("B"+linectr).value(item.Customer_Order_Number);             
                        workbook.sheet(0).cell("C"+linectr).value(item.Transaction_Date);
                        workbook.sheet(0).cell("D"+linectr).value(item.Consignee_1);
                        workbook.sheet(0).cell("E"+linectr).value(item.Area);
                        workbook.sheet(0).cell("F"+linectr).value(item.Consignee_Address);
                        workbook.sheet(0).cell("G"+linectr).value(parseFloat(item.Volume_Weight));
                        workbook.sheet(0).cell("H"+linectr).value(parseFloat(item.Actual_Weight));
    
                        workbook.sheet(0).cell("I"+linectr).value(parseFloat(item.Chargeable_Weight));
                        workbook.sheet(0).cell("J"+linectr).value(parseFloat(item.COD_AMOUNT));
                        workbook.sheet(0).cell("K"+linectr).value(parseFloat(item.Declared_Value));
                        workbook.sheet(0).cell("L"+linectr).value(item.Commodity);
                        workbook.sheet(0).cell("M"+linectr).value(parseFloat(item.Freight));
                        workbook.sheet(0).cell("N"+linectr).value(parseFloat(item.Valuation));
                        workbook.sheet(0).cell("O"+linectr).value(parseFloat(item.COD));
                        workbook.sheet(0).cell("P"+linectr).value(parseFloat(item.Vat));
                        workbook.sheet(0).cell("Q"+linectr).value(parseFloat(item.Total_Amount));
                        workbook.sheet(0).cell("R"+linectr).value(parseFloat(item.Tracking_Number));
                        workbook.sheet(0).cell("S"+linectr).value(item.DR_);
    
    
    
    
                    }
                    
                    linectr=linectr+1;
                  }
                );
            }
          
           
            return workbook.outputAsync("base64");

           
              
              


        });
}

function genReport(data,rpturl) {
    // var rpturl="./forms/rptRecon/rptRecon.xlsx"
   
    return generaterptRecon(data,rpturl)
        .then(function (base64) {
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                throw new Error("Navigating to data URI is not supported in IE.");
            } else {
                var contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
              var b64Data = base64; // 'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
              
              var blob = b64toBlob(b64Data, contentType);
              var blobUrl = URL.createObjectURL(blob);

            
                // location.href = blobUrl ;//"data:" + XlsxPopulate.MIME_TYPE + ";base64," + base64;
                var file=rpturl.split("/");
                var filename = "t5-ecomm.portal."+  getcurrdate() + "." + file[file.length-1];
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display: none";

                a.href = blobUrl;
                a.className="external"
                if (app.data.tmpfile!='') {
                    a.download =  app.data.tmpfile
                    app.data.tmpfile="";
                } else {
                    a.download = filename;
                }
                
                a.click();
                window.URL.revokeObjectURL(blobUrl);



            }
        })
        .catch(function (err) {
            alert(err.message || err);
            throw err;
        });
        
}
function getcurrdate(){
    var today = new Date();
    var dd = today.getDate();
    
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 
    
    if(mm<10) 
    {
        mm='0'+mm;
    } 
    today = yyyy +'-'+  mm +'-'+dd;
    return today;

}

function readXls(file,filetype,fundyear) {

        //Reset Error Messages
        ErrMsgs=null;
        //  console.log(file.name)
        FileName=file.name;
        // A File object is a special kind of blob.
        app.preloader.show();
        app.data.uploadQueue=[];
        app.data.ErrMsgs=[];
        app.data.uploadLines=0;
        app.data.uploadedLines=0;
        app.data.uploadedSuccessLines=0;
        app.data.curcomp.$setState({
            uploadedLines : app.data.uploadedLines,
            uploadLines : app.data.uploadLines

                                    
        })
        // console.log(filetype)
        XlsxPopulate.fromDataAsync(file)
        .then(function (workbook) {
         
          var sheets=workbook._sheets;
          var sheetctr=sheets.length;
          var chunk = {
            data: []
          }
        //   console.log(workbook);
          var rowstr="";
          for (sctr = 0; sctr < sheetctr; sctr++) {
              var sheet=sheets[sctr];
            //   console.log(sheet);
              var rowctr=sheet._rows.length;
                // console.log(rowctr);
              var colheaders="";
              var cellctr=null;
              for (rctr = 1; rctr <= rowctr; rctr++) {
                //   console.log(rctr);
                var row=sheet._rows[rctr];
                if (typeof(row)!="undefined"){
                if (rctr==1){
                    cellctr=row._cells.length;
                } 
                rowstr="";
                cell=row._cells;
                //get file header
                
                for (cctr = 1; cctr <= cellctr; cctr++) {
                    //  console.log(row._cells[cctr])
                    if (typeof(row._cells[cctr])!="undefined"){
                        var cell=row._cells[cctr];
                        
                        if (typeof(cell)!="undefined"){
                            if (typeof(cell._value)!="undefined"){
                                try{
                                    
                                    if (rctr == 1) {
                                        cell._value=cell._value.trim();
                                        cell._value=cell._value.replace(" ","_");
                                        // cell._value=cell._value.replace(/|/g," ");
                                        cell._value=cell._value.replace("(","");
                                        cell._value=cell._value.replace(")","");
                                        cell._value=cell._value.replace(",","");
                                        cell._value=cell._value.replace(".","");
                                        cell._value=cell._value.replace("-","_");
                                        cell._value=cell._value.replace("#","");
                                        cell._value=cell._value.replace("/","_");
                                        cell._value=cell._value.replace("%","_Percent");
                                    } else {
                                        cell._value=cell._value.replace("'","");
                                        cell._value=cell._value.replace(/[|]/g,"");
                                        // if (cctr==6){
                                        //     console.log("Check date pattern: " +cell._value + ":" + ValDate(cell._value));
                                        // }
                                       
                                        if (ValDate(cell._value)==true){
                                            cell._value=convertstrtodate(cell._value);
                                        }
                                         
                                    }
                                } catch {
                                    // cell._value=cell._value.replace("'","");
                                    // cell._value=cell._value.replace("|"," ");
                                }
                                if (cctr==1){
                                    rowstr= cell._value;
                                } else {
                                    if (rctr==1) {
                                        if (cell._value!="") {
                                            rowstr=rowstr + "|" + cell._value;
                                        }
                                    } else {
                                        rowstr=rowstr + "|" + cell._value;
                                    }
                                    
                                }
                                
                            } else {
                                if (rctr!=1) rowstr=rowstr + "|" + "";
                            }
                        } else {
                            if (rctr!=1) rowstr=rowstr + "|" + "";
                        }
                    } else {
                        if (rctr!=1) rowstr=rowstr + "|" + "";
                    }
                    // if (rctr == 2) console.log("cell "+ cctr+ " : " +cell._value);
                }
                if (rctr==1){ 
                    colheaders=rowstr.replace(" ","_");
                    colheaders=colheaders+'|FileName';
                    // console.log(colheaders);
                } else {
                    //Call Upload API after parsing the 1st line
                    rowstr=rowstr+ FileName;
                    
                    if (rctr==2){
                        // console.log(rctr + ":" + rowstr);  
                    } 
                    
                    var sheetId=sctr;
                    var rowId=rctr;
                    var udata = {
                        filetype: filetype,
                        fundyear: fundyear,
                        colheaders: colheaders,
                        sheetId : sheetId,
                        rowId : rowId,
                        rowstr : rowstr,
                        filename: FileName
                    }
                    //modify to upload every 200 lines 

                    if (chunk.data.length>199) {
                        
                        
                        app.data.uploadLines=app.data.uploadLines+chunk.data.length;
                        app.data.uploadQueue=app.data.uploadQueue.concat(chunk);
                        var chunk = {
                            data: []
                          }
                    } else {
                        // console.log(chunk.data)
                        
                        chunk.data=chunk.data.concat(udata);
                        
                    } 
                    // app.data.uploadQueue= uploadline(udata);
                }
                }
                

              }
              //upload chunk
              if (chunk.data.length>0) {
                app.data.uploadLines=app.data.uploadLines+chunk.data.length;
                app.data.uploadQueue=app.data.uploadQueue.concat(chunk);
                // chunk.data=[];
            } 

          }

          workbook = null;
        //   app.data.uploadLines=app.data.uploadQueue.length;
          app.data.uploadedLines=0;
          app.data.uploadCancel=false;
          app.preloader.hide();
          app.methods.uploadlines();
         
        });
}

function ValDate(str) {
    // var str = "09 AUG 2021 23:59";
    
    var patt = /^(0?[1-9]|[12][0-9]|3[01])[ ][A-Z]{3}[ ]\d{4}[ ](0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
    
    var patt = new RegExp(patt);
    var result = patt.test(str.toUpperCase());
    
    
    //var result = str.match(patt);
    
    return result;
}
function convertstrtodate(str){

    var strdate=str.split(" ");
    var DD=strdate[0];
    var MM=strdate[1].toUpperCase();
    var YY=strdate[2];
    var time=strdate[3].split(":");
    var HH=time[0];
    var MIN=time[1];
    var MONTH="";
    switch(MM) {
        case "JAN":
          // code block
          MONTH="01";
          break;
        case "FEB":
          // code block
          MONTH="02";
          break;
        case "MAR":
            // code block
            MONTH="03";
            break;
        case "APR":
        // code block
            MONTH="04";
            break;
        case "MAY":
            // code block
            MONTH="05";
            break;
        case "JUN":
            // code block
            MONTH="06";
            break;
        case "JUL":
            // code block
            MONTH="07";
            break;
        case "AUG":
            // code block
            MONTH="08";
            break;
        case "SEP":
            // code block
            MONTH="09";
            break;
        case "OCT":
        // code block
            MONTH="10";
            break;
        case "NOV":
            // code block
            MONTH="11";
            break;
        case "DEC":
            // code block
            MONTH="12";
            break;
        
            default:
          // code block
      }
      var newdate=""
      newdate = YY+"-"+MONTH+"-"+DD+" "+HH+":"+MIN+":"+"00"
      return newdate
}
