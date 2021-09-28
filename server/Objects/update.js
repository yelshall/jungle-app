var createUpdate = (title, message, dateTime, notifyAll) => {
    let update = {
        title: title,
        message: message,
        dateTime: null, //Date it was created
        notifyAll: notifyAll
    }

    return update;
};