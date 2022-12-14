//The URIs of the REST endpoint
IUPS = "https://prod-93.westeurope.logic.azure.com:443/workflows/23339692194d4cf5b23053eeaad09497/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=84PuVOC1zMEhW-Kt-erDNBY-fVsUCxlFp_fmo8x7x7Q";
RAI = "https://prod-31.centralus.logic.azure.com:443/workflows/2dd8eb22efdc4c9d881c8a4c4a9233aa/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=KZYf3jxvcIN_mJEh-epHU3hbsfo6PXQDUUOpjpq95eg";

BLOB_ACCOUNT = "https://cw2blobstorage.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retImages").click(function(){

      //Run the get asset list function
      getImages();

      //Replace the current HTML in that div with a loading message
      $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
      $.getJSON(RAI, function( data ) {

      //Create an array to hold all the retrieved assets
      var items = [];
      
      //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
      $.each( data, function( key, val ) {

          items.push("<hr />");
          items.push(" <video width='500' height='400' controls>");
          items.push(" <source src=" + BLOB_ACCOUNT + val["filepath"] + " /> <br />");
          items.push(" </video>");
          items.push(" <br>");
      items.push("<img src='"+BLOB_ACCOUNT + val["filepath"] +"' width='400'/> <br />")
      items.push( "File : " + val["fileName"] + "<br />");
      items.push( "Uploaded by: " + val["userName"] + " (user id: "+val["userID"]+")<br />");
	  items.push( "videoID: " + val["videoID"] + "<br />");
	  items.push( "video TITLE: " + val["videoTITLE"] + "<br />");
	  items.push( "video PRODUCER: " + val["videoPRODUCER"] + "<br />");
	  items.push( "video GENRE: " + val["videoGENRE"] + "<br />");
	  items.push( "video AGERATING: " + val["videoAGERATING"] + "<br />");
	  items.push( "video LIKES: " + val["videoLIKES"] + "<br />");
	  items.push( "video DISLIKES: " + val["videoDISLIKES"] + "<br />");
      items.push( "<hr />");


      });


      //Clear the assetlist div 
      $('#ImageList').empty();


      //Append the contents of the items array to the ImageList Div
      $( "<ul/>", {
      "class": "my-new-list",
      html: items.join( "" )
      }).appendTo( "#ImageList" );
      });



  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){

  //Create a form data object
  submitData = new FormData();

  //Get form variables and append them to the form data object
  submitData.append('FileName', $('#FileName').val());
  submitData.append('userID', $('#userID').val());
  submitData.append('userName', $('#userName').val());
  submitData.append('File', $("#UpFile")[0].files[0]);

  
  //Post the form data to the endpoint, note the need to set the content type header
  $.ajax({
  url: IUPS,
  data: submitData,
  cache: false,
  enctype: 'multipart/form-data',
  contentType: false,
  processData: false,
  type: 'POST',
  success: function(data){
  
  }
  });
 

}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages(){

 
}

