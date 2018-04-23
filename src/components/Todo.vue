<template>
<div>
  <div class="col-md-3">
    <div class="row">
      <div class="col-sm-12">
        <div class="panel panel-danger">
          <div class="panel panel-heading"><h3><strong>BACKLOG</strong></h3></div>
          <div class="panel-body">
            <div class="thumbnail" >
              <div class="caption" v-for="tasklist in taskLists" v-if="tasklist.status === 'backlog'" :key="tasklist">
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
              <div class="caption" v-for="tasklist in taskLists" v-if="tasklist.status === 'todo'" :key="tasklist">
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
              <div class="caption" v-for="tasklist in taskLists" v-if="tasklist.status === 'doing'" :key="tasklist">
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
              <div class="caption" v-for="tasklist in taskLists" v-if="tasklist.status === 'done'" :key="tasklist">
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

  <!-- Detail Modal Task -->
  <div class="modal fade" v-if="currentTask !== null" id="modalDetail" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Detail Task</h4>
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
import kanbanRef from '@/assets/js/firebase.js'

export default {
  name: 'todo',
  props: ['taskLists'],
  kanbanRef: kanbanRef,
  data () {
    return {
      currentTask: null
    }
  },
  methods: {
    showDetail (tasks) {
      console.log('DETAIL TASK=====', tasks['.key'])
      this.currentTask = tasks
    },
    removeTask (tasks) {
      kanbanRef.child(tasks['.key']).remove()
    },
    backlog (tasks) {
      let data = kanbanRef.child(tasks['.key'])
      data.update({
        'status': 'backlog'
      })
    },
    todo (tasks) {
      let data = kanbanRef.child(tasks['.key'])
      data.update({
        'status': 'todo'
      })
    },
    doing (tasks) {
      let data = kanbanRef.child(tasks['.key'])
      data.update({
        'status': 'doing'
      })
    },
    done (tasks) {
      let data = kanbanRef.child(tasks['.key'])
      data.update({
        'status': 'done'
      })
    }
  }
}
</script>
