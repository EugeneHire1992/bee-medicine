const appDispathcer = require('./../dispatcher.js');
const webApiUtils = require('./../web-api-utils.js');
const EventEmitter = require('events').EventEmitter;

let services = [
  {
    serviceName: '1 hour',
    price: 0,
    description: '1 hour of good and healthy sleep'
  }];

let isFetched = false;
class ServicesStore extends EventEmitter {
  isFetched() {
    return isFetched;
  }
  getServices() {
    if (!isFetched) {
      fetchServices();
      return {
        status: 'fethcing',
        data: null
      }
    }
    return {
      status: 'fetched',
      data: services
    }

  }
  saveBooking() {
    $.post('/contacts',
      _bookingInProcess
    ).done(function (data) {
      console.log(data);
    }).fail(function (data) {
      console.log(data);
    })
  }
}
const servicesStore = new ServicesStore();

function fetchServices () {
  setTimeout(function () {
    isFetched = true;
    servicesStore.emit('updated');
  }, 5000);
}

appDispathcer.register((action) => {
  switch(action.actionType) {
    case 'service-update':
      //update service
      servicesStore.emit('updated');
      break;
  }
});

module.exports = servicesStore;