var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var fs = require('fs');

var visualRecognition = new VisualRecognitionV3({
	version: '2018-03-19',
	iam_apikey: process.env.APIKEY
});

var images_file= fs.createReadStream('./basura5.jpg');
var classifier_ids = ["Deshechos-yaku_1826911947"];
var threshold = 0.6;

var params = {
	images_file: images_file,
	classifier_ids: classifier_ids,
	threshold: threshold
};

function callVisualRecognition() {
    return new Promise(function(resolve, reject) {
        visualRecognition.classify(params, function(err, response) {
            if (err) { 
                console.log(err);
            } else {
                console.log(JSON.stringify(response, null, 2))
            }
        });
    })
}

module.exports = callVisualRecognition;