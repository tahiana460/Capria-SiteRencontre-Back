const { pool } = require('../database');
var formidable = require('formidable');
//const faceapi = require('face-api.js');
//const { detectAllFaces } = require('face-api.js');
//const tf = require('@tensorflow/tfjs');
const fs = require('fs');

const faceapi = require('./face-api.node.js');
//const tf = require("@tensorflow/tfjs-node");

const upload = async (req, res) => {
    let data = req.body;
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if(err) console.log(err)
        //console.log(fields)
        //console.log(files.file)
        //console.log(form)
        console.log(files)
        console.log(fields)
        
    });
    const result={'message':"ok"}
    //const [result] = await pool.query(`INSERT INTO user(nom, prenom, mail, mdp, pseudo, sexe, dateDeNaissance, ville, nation, orientationSxl, photoDeProfil) VALUES (?, ?, ?, sha1(?), ?, ?, ?, ?, ?, ?, ?)`, [data.name, data.firstname, data.email, data.password, data.pseudo, data.gender, data.date_of_birth, data.city, data.nationality, data.sexual_orientation, data.profile_picture])
    res.status(201).json(result);
}

const detect=async (req,res)=>{
    //console.log(req.body)    
    let data = req.body;
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if(err) console.log(err)
        //console.log('FORM')
        //const file=files.image[0]
        //console.log(file)
        const uri='./public/models' 
        Promise.all([
            faceapi.nets.ssdMobilenetv1.loadFromDisk(uri), // load models from a specific patch
            faceapi.nets.faceLandmark68Net.loadFromDisk(uri),
            faceapi.nets.ageGenderNet.loadFromDisk(uri),
            faceapi.nets.faceRecognitionNet.loadFromDisk(uri),
            faceapi.nets.faceExpressionNet.loadFromDisk(uri)
        ]).then(()=>{
            const options = new faceapi.SsdMobilenetv1Options({ minConfidence: 0.1, maxResults: 10 }); // set model options
            const buffer = data; // load jpg image as binary
            const decodeT = faceapi.tf.node.decodeImage(buffer, 3); // decode binary buffer to rgb tensor
            const expandT = faceapi.tf.expandDims(decodeT, 0); // add batch dimension to tensor
            faceapi.detectAllFaces(expandT, options)
                .then((result)=>{
                    faceapi.tf.dispose([decodeT, expandT]); // dispose tensors to avoid memory leaks
                    //console.log( result );
                    const nbFaces={nb:result.length }
                    res.status(201).json(nbFaces)
                    //res.sendStatus(200)
                })
        })       
    });    
}




module.exports = { 
    upload,
    detect
};