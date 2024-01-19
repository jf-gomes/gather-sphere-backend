import Events from "../models/Events.js"

async function getEvents(request, response){
    const events = await Events.find()
    return response.status(200).json(events)
}

async function createEvent(request, response){
    const event = request.body
    const newEvent = await Events.create(event)
    return response.status(201).json(newEvent)
}

async function delEvent(request, response){
    const id = request.params.id
    await Events.findByIdAndDelete({ _id: id })
    return response.status(200).json({ response: 'Event deleted' })
}

async function editEvent(request, response){
    const id = request.params.id
    await Events.replaceOne({ _id: id }, request.body)
    return response.status(200).json({ response: 'Event edited' })
}

export { getEvents, createEvent, delEvent, editEvent }