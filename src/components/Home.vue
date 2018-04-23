<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h1>KANBAN APPS</h1>
        <button class="btn btn-danger" data-toggle="modal" data-target="#addModal">New Task</button>
        <hr>
        <todo :taskLists="tasklists"></todo>
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
  </div>
</template>

<script>
import todo from '@/components/Todo.vue'

import kanbanRef from '@/assets/js/firebase.js'

export default {
  name: 'home',
  firebase: {
    tasklists: kanbanRef
  },
  components: {
    todo
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
      kanbanRef.push(this.addTasks)
      this.addTasks.title = ''
      this.addTasks.description = ''
      this.addTasks.point = ''
      this.addTasks.assign = ''
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
