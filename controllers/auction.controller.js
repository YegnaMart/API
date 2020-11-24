const Bid = require("../models/bid.model");
const io = require("socket.io");

export default (server) => {
    const io = require('socket.io').listen(server)
    //when user connected  the connection event is emited
    io.on('connection', function(socket){
        socket.on('join auction room', data => {
            socket.join(data.room);
        })
        socket.on('leave auction room', data => {
            socket.leave(data.room);
        })
        socket.on('new bid', data => {
            bid(data.bidInfo, data.room);
        })
    })

const bid = async (bid, auction) => {
    try {
        let result = await Bid.findOneAndUpdate({
            _id: auction, $or: [{ 'bids.0.bid': { $lt: bid.bid } },
            { bids: { $eq: [] } }]
        }, {
            $push: {
                bids: {
                    $each: [bid],
                    $position: 0
                }
            }
        }, { new: true })
            .populate('bidder', '_id fullname')
            .populate('postedBy', '_id warehouse_code')
            .exec()
        io.to(auction)
          .emit('new bid', result)
    } catch (err) {
        console.log(err)
    }
}
}
/*
socket.broadcast.emit() => all client not connected
io.emit() = all client in jeneral
socket.emit() => for single user that is connected

*/