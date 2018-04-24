/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Lab 7</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item ">
            <router-link class="nav-link" to="/api/upload"> Upload Form </router-link>
          </li>
        </ul>
      </div>
    </nav>
    `
});



Vue.component('app-footer', {
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; Flask Inc.</p>
        </div>
    </footer>
    `
});

const Home = Vue.component('home', {
   template: `
    <div class="jumbotron">
        <h1>Lab 7</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
    </div>
   `,
    data: function() {
       return {}
    }
});

const UploadForm= Vue.component('upload-form', {
  template: 
  ` <div class="container">
    <div class="col-md-8">
    <div class="form-area">
        <form id="uploadForm" @submit.prevent="uploadform" method="POST" enctype="multipart/form-data" >
      <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
    </p>
        <h1> Upload Form </h1> 
        <div class="form-group">
            <textarea class="form-control" type="textarea" v-model="description"  placeholder="Description" maxlength="140" rows="5"></textarea>
          </div><br>
          <div class="form-group">
            <input  type="file" name="file" multiple>
          </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
    </div>
    </div>
  `,
  data: function(){
    return{
      errors:[],
      description:'',
      file:[]
    }
  },
  methods: {
    uploadform:function(e) {
      if(this.description && this.file) return true;
      this.errors = [];
      if(!this.description) this.errors.push("Description required.");
      if(!this.file) this.errors.push("Photo required.");
      e.preventDefault();
      let uploadForm = document.getElementById('uploadForm');
      let form_data = new FormData(uploadForm);
      fetch("/api/upload", {
        method: 'POST',
        body: form_data,
        headers: { 
            'X-CSRFToken': token
          },
          credentials: 'same-origin'
      })
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonResponse) {
         // display a success message
          console.log(jsonResponse);
      })
        .catch(function (error) {
          console.log(error);
        });
      }
    }
});

// Define Routes
const router = new VueRouter({
    routes: [
        { path: "/", component: Home },
        { path: "/api/upload", component: UploadForm}
    ]
});

// Instantiate our main Vue Instance
let app = new Vue({
    el: "#app",
    router
});