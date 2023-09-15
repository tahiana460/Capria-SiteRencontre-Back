//import { Client, SANDBOX_URL, TransactionRequest } from "mvola";
const { Client, SANDBOX_URL, TransactionRequest } =require("mvola") ;
//import { v4 } from "uuid";
const { v4 } =require("uuid");
var mvolaClient=null;
var correlationId=''
var request=null;
var respon=null;

const main= async (req,res) => {
  request=req
  let data=req.body
  const num_envoi=data.numero
  const montant=data.montant
  respon=res
  //const consumerKey = process.env.CONSUMER_KEY;
  const consumerKey = 'bfiHj79knLvvIofDfRgdaNxX89Qa';
  //const consumerSecret = process.env.CONSUMER_SECRET;
  const consumerSecret = 'goFFU7Duj0jM5fbBE_GGKjv0O64a';
  const mvola = new Client(SANDBOX_URL);
  console.log('SANDBOX_URL');
  console.log(SANDBOX_URL);
  try{
    const data = await mvola.auth.generateToken(consumerKey, consumerSecret);

    mvola.transaction.setAccessToken(data.access_token);
    mvola.transaction.setOptions({
      version: "1.0",
      correlationId: v4(),
      userLanguage: "FR",
      userAccountIdentifier: "msisdn;0343500004",
      partnerName: "TestMVola",
      //callbackUrl: "localhost:3100/result"
    });

    const transactionRef = v4();

    const tx = {
      amount: 1000,
      currency: "Ar",
      descriptionText: "test",
      requestDate: new Date().toISOString(),
      debitParty: [
        {
          key: "msisdn",
          value: "0343500003",
        },
      ],
      creditParty: [
        {
          key: "msisdn",
          value: "0343500004",
        },
      ],
      metadata: [
        {
          key: "partnerName",
          value: "TestMVola",
        },
        {
          key: "fc",
          value: "USD",
        },
        {
          key: "amountFc",
          value: "1",
        },
      ],
      requestingOrganisationTransactionReference: transactionRef,
      originalTransactionReference: transactionRef,
    };
    const response = await mvola.transaction.initMerchantPayment(tx);
    console.log(response);
    mvolaClient=mvola;
    correlationId=response.serverCorrelationId
    const statu=await getStatus()
    console.log(statu)
  } catch(error){
    console.log(error)
    const obj={'statu':500,'msg':"Une erreur est survenue. Veuillez réessayer plus tard."}
    //res.send(JSON.stringify(obj))
    res.json(obj)
  }
}

const getStatus = async() =>{
  var statu=await mvolaClient.transaction.getStatus(correlationId);
  console.log(statu.status)
  if(statu.status=='pending'){
    setTimeout(getStatus,10000)
  }else if(statu.status=='completed'){
    const obj={'statu':200,'msg':'Payement effectué'}
    //respon.send(JSON.stringify(obj))
    respon.json(obj)
  }else{
    const obj={'statu':401,'msg':"Veuillez réessayer et entrer le mot de passe correct."}
    //respon.send(JSON.stringify(obj))
    respon.json(obj)
  }
  return statu;
}

//main();
module.exports={main}
