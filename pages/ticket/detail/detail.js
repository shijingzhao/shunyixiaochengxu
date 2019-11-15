// pages/ticket/detail/detail.js
const req = require('../../../req/index.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: Array,
    checkbox: [{
      value: 0,
      name: '10元',
      checked: false,
      hot: false,
    }, {
      value: 1,
      name: '20元',
      checked: false,
      hot: false,
    }, {
      value: 2,
      name: '30元',
      checked: false,
      hot: true,
    }, {
      value: 3,
      name: '60元',
      checked: false,
      hot: true,
    }, {
      value: 4,
      name: '80元',
      checked: false,
      hot: false,
    }, {
      value: 5,
      name: '100元',
      checked: false,
      hot: false,
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getTicketDetail(options.tId)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  buy(e) {
    console.log(this.data.checkbox)
    this.setData({
      modalName: null
    })
  },
  ChooseCheckbox(e) {
    let items = this.data.checkbox;
    let values = e.currentTarget.dataset.value;
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      if (items[i].value == values) {
        items[i].checked = true
      }
      else {
        items[i].checked = false
      }
    }
    this.setData({
      checkbox: items
    })
  },
  getTicketDetail(tId) {
    req.ticket.getFilterDetail(tId)
      .then((res) => {
        this.setData({
          info: res.result
        })
      })
      .catch(req.err.show)
  }
})