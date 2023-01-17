<iframe id="iframe" src="data:text/html,Hey, Lets bypass the safe"></iframe>
<br><br>
<button id="load-button">Download</button>

<script>
    // Get the button and iframe by their ID
    let loadButton = document.getElementById("load-button");
    let iframe = document.getElementById("iframe");

    // Add a click event listener to the button
    loadButton.addEventListener("click", function() {
        // Change the src attribute of the iframe
        iframe.src = "download.php";
    });
</script>
