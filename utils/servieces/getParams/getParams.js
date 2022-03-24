// 该 js 文件用于处理 前端传递过来的参数
const md5Hex = require("md5");
//用户ID，快递鸟提供，注意保管，不要泄漏
const EBusinessID = '1740131';//即用户ID，登录快递鸟官网会员中心获取 https://www.kdniao.com/UserCenter/v4/UserHome.aspx 
//API key，快递鸟提供，注意保管，不要泄漏
const ApiKey = '17356b58-9152-4b9c-85bf-a315c44a1fa5';//即API key，登录快递鸟官网会员中心获取 https://www.kdniao.com/UserCenter/v4/UserHome.aspx


// post(Url,getParams()).then(res=>{
//     console.log(res.data)
// })
//以form表单形式提交post请求，post请求体中包含了应用级参数和系统级参数

function getParams (params) {
    //请求接口指令
    const RequestType = '1007';
    // 组装应用级参数
    /* 系统级参数
 * RequestData	String	R	请求内容为JSON格式 详情可参考接口技术文档：https://www.kdniao.com/documents
 * EBusinessID	String	R	用户ID
 * RequestType	String	R	请求接口指令
 * DataSign	    String	R	数据内容签名，加密方法为：把(请求内容(未编码)+ApiKey)进行MD5加密--32位小写，然后Base64编码，最后进行URL(utf-8)编码
 * DataType	    String	R	DataType=2，请求、返回数据类型均为JSON格式

 * 应用级参数
 * R-必填（Required），O-可选（Optional），C-报文中该参数在一定条件下可选（Conditional）
 * Callback                   String(50)   O   用户自定义回传字段
 * CustomerName               String(50)   C   电子面单客户号，需要下载《快递鸟电子面单客户号参数对照表.xlsx》，参考对应字段传值 https://www.kdniao.com/documents
 * CustomerPwd                String(50)   C   同上
 * SendSite                   String(50)   C   同上
 * SendStaff                  String(50)   C   同上
 * MonthCode		          String(20)   C   同上
 * CustomArea                 String(500)  O   商家自定义区域，需查看技术文档说明
 * WareHouseID                String(30)   C   发货仓编码(ShipperCode为JD或JDKY时必填)
 * TransType                  Int(2)       O   京东(ShipperCode为JD或JDKY)的产品类型，需查看技术文档说明
 * ShipperCode                String(10)   R   快递公司编码详细编码参考《快递鸟接口支持快递公司编码.xlsx》 https://www.kdniao.com/documents
 * LogisticCode               String(30)   O   快递单号(仅宅急送可用)
 * OrderCode                  String(30)   R   订单编号(自定义，不可重复)
 * ThrOrderCode               String(50)   C   京东商城的订单号(ShipperCode为JD且ExpType为1时必填)
 * PayType                    Int(1)       R   运费支付方式：1-现付，2-到付，3-月结
 * ExpType                    String(2)    R   详细快递类型参考《快递公司快递业务类型.xlsx》 https://www.kdniao.com/documents
 * IsReturnSignBill           Int(1)       O   是否要求签回单 0-不要求，1-要求
 * Receiver.Company           String(30)   O   收件人公司
 * Receiver.Name              String(30)   R   收件人
 * Receiver.Tel               String(20)   R   电话(电话与手机，必填一个)
 * Receiver.Mobile            String(20)   R   手机(电话与手机，必填一个)
 * Receiver.PostCode          String(10)   C   收件地邮编(ShipperCode为EMS、YZPY、YZBK时必填)
 * Receiver.ProvinceName      String(20)   R   收件省(如广东省，不要缺少“省”；如是直辖市，请直接传北京、上海等；如是自治区，请直接传广西壮族自治区等)
 * Receiver.CityName          String(20)   R   收件市(如深圳市，不要缺少“市；如是市辖区，请直接传北京市、上海市等”)
 * Receiver.ExpAreaName       String(20)   R   收件区/县(如福田区，不要缺少“区”或“县”)
 * Receiver.Address           String(100)  R   收件人详细地址(不用传省市区)
 * Sender.Company             String(30)   O   发件人公司
 * Sender.Name                String(30)   R   发件人
 * Sender.Tel                 String(20)   R   电话(电话与手机，必填一个)
 * Sender.Mobile              String(20)   R   手机(电话与手机，必填一个)
 * Sender.PostCode            String(10)   C   发件地邮编(ShipperCode为EMS、YZPY、YZBK时必填)
 * Sender.ProvinceName        String(20)   R   发件省(如广东省，不要缺少“省”；如是直辖市，请直接传北京、上海等；如是自治区，请直接传广西壮族自治区等)
 * Sender.CityName            String(20)   R   发件市(如深圳市，不要缺少“市；如是市辖区，请直接传北京市、上海市等”)
 * Sender.ExpAreaName         String(20)   R   发件区/县(如福田区，不要缺少“区”或“县”)
 * Sender.Address             String(100)  R   发件人详细地址(不用传省市区)
 * IsNotice                   Int(1)       O   是否通知快递员上门揽件 0-通知，1-不通知，不填则默认为1
 * StartDate                  String(32)   O   上门揽件时间段，格式：YYYY-MM-DD HH24:MM:SS
 * EndDate                    String(32)   O   上门揽件时间段，格式：YYYY-MM-DD HH24:MM:SS
 * Weight                     Double(10,3) C   包裹总重量kg  1、当为快运的订单时必填；2、ShipperCode为JD时必填；
 * Quantity                   Int(2)       R   包裹数(最多支持300件)一个包裹对应一个运单号，如果是大于1个包裹，返回则按照子母件的方式返回母运单号和子运单号
 * Volume                     Double(20,3) C   包裹总体积m3  1、当为快运的订单时必填；2、ShipperCode为JD时必填；
 * Remark                     String(60)   O   备注
 * AddService.Name            String(20)   C   增值服务名称(数组形式，可以有多个增值服务)
 * AddService.Value           String(30)   C   增值服务值
 * AddService.CustomerID      String(30)   O   客户标识
 * Commodity.GoodsName        String(100)  R   商品名称（数组形式）
 * IsReturnPrintTemplate      String(1)    O   是否返回电子面单模板：0-不需要，1-需要
 * IsSendMessage              Int(1)       O   是否订阅短信：0-不需要，1-需要
 * IsSubscribe                String(1)	   O   是否订阅轨迹推送 0-不订阅，1-订阅，不填默认为1
 * TemplateSize	              String(10)   O   模板规格，需查看技术文档说明
 * PackingType	              Int(2)   	   C   包装类型(快运字段)，需查看技术文档说明
 * DeliveryMethod	          Int(1)	   C   送货方式/派送类型/配送方式(快运字段)，需查看技术文档说明
 * CurrencyCode	              String(10)   C   货物单价的币种：CNY: 人民币 HKD: 港币 NTD: 新台币 MOP: 澳门元 (ShipperCode为SF且收件地址为港澳台地区，必填)
 * Dutiable.DeclaredValue	  Number(15,3) C   申报价值：订单货物总声明价值，包含子母件，精确到小数点后3位 (ShipperCode为SF且收件地址为港澳台地区，必填)
 */
    const RequestData = {
        'OrderCode': params.orderCode,
        'ShipperCode': 'STO',
        'CustomerName': '鸿正',
        'CustomerPwd': 'sto1314520',
        'MonthCode': '密钥',
        'SendSite': '646000',
        'PayType': 1,
        'MonthCode': '1234567890',
        'TemplateSize': 130,
        'ExpType': 1,
        'Cost': 1.0,
        'OtherCost': 1.0,
        'Sender':  params.sender,
        'Receiver':  params.receiver,
        'Commodity':  params.commodity,
      //   'Sender': {
      //     'Company': 'LV',
      //     'Name': 'Taylor',
      //     'Mobile': '15018442396',
      //     'ProvinceName': '上海',
      //     'CityName': '上海市',
      //     'ExpAreaName': '青浦区',
      //     'Address': '明珠路'
      // },
      // 'Receiver': {
      //     'Company': 'GCCUI',
      //     'Name': 'Yann',
      //     'Mobile': '15018442396',
      //     'ProvinceName': '北京',
      //     'CityName': '北京市',
      //     'ExpAreaName': '朝阳区',
      //     'Address': '三里屯街道'
      // },
      // 'Commodity': [
      //     {
      //         'GoodsName': '鞋子',
      //         'Goodsquantity': 1,
      //         'GoodsWeight': 1.0
      //     },
      //     {
      //         'GoodsName': '衣服',
      //         'Goodsquantity': 1,
      //         'GoodsWeight': 1.0
      //     }
      // ],
        // 'AddService': [
        //     {
        //         'Name': 'INSURE',
        //         'Value': '1000'
        //     },
        //     {
        //         'Name': 'COD',
        //         'Value': '1020',
        //         'CustomerID ': '1234567890'
        //     }
        // ],
        'Weight': 1.0,
        'Quantity': 1,
        'Volume': 0.0,
        'IsReturnPrintTemplate': 1
    }
    // console.log(JSON.stringify(RequestData) + ApiKey);
    // const DataSign = md5Hex(JSON.stringify(RequestData) + ApiKey).toString('base64')
    // const buffer = new ArrayBuffer(0)
    const DataSign = Buffer.from(md5Hex(JSON.stringify(RequestData) + ApiKey)).toString('base64')
    // console.log(DataSign);
    const reqParams = {
        RequestType,
        EBusinessID,
        DataSign,
        RequestData: JSON.stringify(RequestData),
        DataType: 2
    }
    // console.log(reqParams);
    return reqParams
}
module.exports = getParams