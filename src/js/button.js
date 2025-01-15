// Create an app
var app = new Reef('#app', {
	data: {
				todos: ['...']
	},
	template: function (props) {
				return `
	<div id="container"></div>
<div id="info">
				
<div class="collapse" id="navbarToggleExternalContent" data-bs-theme="dark">
  <div class="bg-light p-4">
    <span class="text-body-dark"><h3>re:Pac</h3> Made with old mobile phone.</span>
  </div>
</div>
<nav class="navbar navbar-light bg-transparent">
  <div class="container-fluid">
    <div class="navbar-brand" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-brand text-secondary"> <i class="fa fa-regular fa-copyright"></i> 2025</span>
    </div>
    <div><button class="btn btn-outline-succes text-danger id="buttonLogin" type="button"><i class="fa fa-solid fa-power-off"></i> </button></div>
  </div>
</nav>
  <div class=" p-4">

    <p class="text-secondary"></p>
    <p class="text-secondary" id="text"></p>
  </div>

  
  `;
	}
});


// Render the app
app.render();

const text = async ( message) => {
    const log = document.querySelector("#text");
    if (typeof message == 'object') {   log.innerHTML += JSON.stringify( message, null, 2 )  + '<br>'}
       
    else { log.innerHTML +=  message   + '<br>'}
};
    
text( 'random text...')
