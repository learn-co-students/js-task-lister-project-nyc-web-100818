// implementing event emitter pattern to emit and listen for events 
// between model/controller/view
class EventEmitter {
  constructor() {
    this.events = {}
  }

  subscribe(eventLabel, callback) {
    // create a new key for our event with the eventLabel
    if (!this.events[eventLabel])
      this.events[eventLabel] = []
    
    // push the function into the event
    this.events[eventLabel].push(callback)
  }

  // unsubscribe: remove a function from the event object
  unsubscribe(eventLabel, callback) {
    this.events[eventLabel] = this.events[eventLabel].filter(eventFn => callback !== eventFn)
  }

  emit(eventLabel, data) {
    console.log("Event emitted:", eventLabel, data)
    // lookup the event in events object
    const event = this.events[eventLabel]
    if (event) {
      // call each function assigned to the event label
      event.forEach(callback => {
        debugger
        // call the function with null as the 'thisArg' and the data passed in
        callback.call(null, data)
      })
    }
  }
}