<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h1>KANBAN APPS</h1>
        <button class="btn btn-danger" data-toggle="modal" data-target="#addModal">New Task</button>
        <hr>

        <div class="col-md-3">
          <div class="row">
            <div class="col-sm-12">
              <div class="panel panel-danger">
                <div class="panel panel-heading"><h3><strong>BACKLOG</strong></h3></div>
                <div class="panel-body">
                  <div class="thumbnail" >
                    <div class="caption" v-for="tasklist in tasklists" v-if="tasklist.status === 'backlog'" :key="tasklist">
                      <!-- <h4> {{tasklist}} </h4> -->
                      <div>
                        <h4><strong>{{ tasklist.title }}</strong></h4>
                        <hr>
                        <p><strong> Point: </strong>{{tasklist.point}} </p>
                        <p><strong> Assigned To: </strong> {{ tasklist.assign }}</p>
                        <button @click="showDetail(tasklist)" class="btn btn-danger" data-toggle="modal" data-target="#modalDetail">Detail</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="row">
            <div class="col-sm-12">
              <div class="panel panel-warning">
                <div class="panel panel-heading"><h3><strong>TODO</strong></h3></div>
                <div class="panel-body">
                  <div class="thumbnail" >
                    <div class="caption" v-for="tasklist in tasklists" v-if="tasklist.status === 'todo'" :key="tasklist">
                      <!-- <h4> {{tasklist}} </h4> -->
                      <div>
                        <h4><strong>{{ tasklist.title }}</strong></h4>
                        <hr>
                        <p><strong> Point: </strong>{{tasklist.point}} </p>
                        <p><strong> Assigned To: </strong> {{ tasklist.assign }}</p>
                        <button @click="showDetail(tasklist)" class="btn btn-warning" data-toggle="modal" data-target="#modalDetail">Detail</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="row">
            <div class="col-sm-12">
              <div class="panel panel-info">
                <div class="panel panel-heading"><h3><strong>DOING</strong></h3></div>
                <div class="panel-body">
                  <div class="thumbnail" >
                    <div class="caption" v-for="tasklist in tasklists" v-if="tasklist.status === 'doing'" :key="tasklist">
                      <!-- <h4> {{tasklist}} </h4> -->
                      <div>
                        <h4><strong>{{ tasklist.title }}</strong></h4>
                        <hr>
                        <p><strong> Point: </strong>{{tasklist.point}} </p>
                        <p><strong> Assigned To: </strong> {{ tasklist.assign }}</p>
                        <button @click="showDetail(tasklist)" class="btn btn-info" data-toggle="modal" data-target="#modalDetail">Detail</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="row">
            <div class="col-sm-12">
              <div class="panel panel-success">
                <div class="panel panel-heading"><h3><strong>DONE</strong></h3></div>
                <div class="panel-body">
                  <div class="thumbnail" >
                    <div class="caption" v-for="tasklist in tasklists" v-if="tasklist.status === 'done'" :key="tasklist">
                      <!-- <h4> {{tasklist}} </h4> -->
                      <div>
                        <h4><strong>{{ tasklist.title }}</strong></h4>
                        <hr>
                        <p><strong> Point: </strong>{{tasklist.point}} </p>
                        <p><strong> Assigned To: </strong> {{ tasklist.assign }}</p>
                        <button @click="showDetail(tasklist)" class="btn btn-success" data-toggle="modal" data-target="#modalDetail">Detail</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Modal For Add Task -->
    <div class="modal fade" id="addModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close btn-danger" data-dismiss="modal">&times;</button>
            <h4 class="modal-title"> Kanban </h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="Title"> Title </label>
                <input type="text" v-model="addTasks.title" class="form-control" id="title" placeholder="Your Title Task..">
              </div>
              <div class="form-group">
                <label for="Description">Description</label>
                <textarea v-model="addTasks.description" class="form-control" rows="5" id="description" placeholder="Your Task Description..."></textarea>
              </div>
              <div class="form-group">
                <label for="Point">Point </label>
                <input type="text" v-model="addTasks.point" class="form-control" id="point" placeholder="0">
              </div>
              <div class="form-group">
                <label for="Assign"> Assigned To </label>
                <input type="text" v-model="addTasks.assign" class="form-control" id="assign" placeholder="People in Charge">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger" data-dismiss="modal">Close</button>
            <button @click="addTask" class="btn btn-success" data-dismiss="modal">Add Task</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail Modal Task -->
    <div class="modal fade" v-if="currentTask !== null" id="modalDetail" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Detail Task</h4>
            <!-- <h5> {{currentTask}} </h5> -->
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="Title">{{ currentTask.title }} for {{ currentTask.assign }}</label>
                <p><strong>Task Description:</strong>  {{ currentTask.description }}</p>
                <p><strong> Point: </strong>{{currentTask.point}} </p>
                <p><strong> Status: </strong>{{currentTask.status}} </p>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button @click="removeTask(currentTask)" type="button" class="btn btn-danger" data-dismiss="modal">DELETE</button>
            <button v-if="currentTask.status === 'todo'" @click="backlog(currentTask)" class="btn btn-warning" data-dismiss="modal">BACKLOG</button>
            <button v-if="currentTask.status === 'doing' || currentTask.status === 'backlog'" @click="todo(currentTask)" type="button" class="btn btn-warning" data-dismiss="modal">TODO</button>
            <button v-if="currentTask.status === 'todo'  || currentTask.status === 'done'" @click="doing(currentTask)" type="button" class="btn btn-info" data-dismiss="modal">DOING</button>
            <button v-if="currentTask.status === 'doing'" @click="done(currentTask)" type="button" class="btn btn-success" data-dismiss="modal">DONE</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Firebase from 'firebase'
// Initialize Firebase
const config = {
  apiKey: 'AIzaSyAv2cD-sXHx2Cd5TrQWDyr6bTPUFxVLJ7w',
  authDomain: 'firstproject-ecc01.firebaseapp.com',
  databaseURL: 'https://firstproject-ecc01.firebaseio.com',
  projectId: 'firstproject-ecc01',
  storageBucket: 'firstproject-ecc01.appspot.com',
  messagingSenderId: '282002161024'
}
let kanbanFirebase = Firebase.initializeApp(config)
let db = kanbanFirebase.database().ref('tasks')

export default {
  name: 'home',
  firebase: {
    tasklists: db
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      detailTaskModal: false,
      addTasks: {
        title: '',
        description: '',
        point: '',
        assign: '',
        status: 'backlog'
      },
      currentTask: null
    }
  },
  methods: {
    addTask () {
      db.push(this.addTasks)
      this.addTasks.title = ''
      this.addTasks.description = ''
      this.addTasks.point = ''
      this.addTasks.assign = ''
    },
    showDetail (tasks) {
      console.log('DETAIL TASK=====', tasks['.key'])
      this.currentTask = tasks
    },
    removeTask (tasks) {
      db.child(tasks['.key']).remove()
    },
    backlog (tasks) {
      let data = db.child(tasks['.key'])
      data.update({
        'status': 'backlog'
      })
    },
    todo (tasks) {
      let data = db.child(tasks['.key'])
      data.update({
        'status': 'todo'
      })
    },
    doing (tasks) {
      let data = db.child(tasks['.key'])
      data.update({
        'status': 'doing'
      })
    },
    done (tasks) {
      let data = db.child(tasks['.key'])
      data.update({
        'status': 'done'
      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
