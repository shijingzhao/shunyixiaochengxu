// pages/index/index/index.js
const http = require('../../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params: [0,0],
    maxPage: 1,
    page: 1,
    fineList: [],
    filter: [{
      type: 'radio',
      label: '分类',
      value: 'tType',
      checked: true,
      children: [{
        label: '全部分类',
        value: '0',
        checked: true, // 默认选中
      },
      {
        label: '小提琴',
        value: '1',
      },
      ],
      groups: ['001'],
    },
    {
      type: 'radio',
      label: '时间段',
      value: 'period',
      checked: true,
      children: [{
        label: '全部时间',
        value: '0',
        checked: true, // 默认选中
      },
      {
        label: '一周内',
        value: '1',
      },
      ],
      groups: ['002'],
    }
    ],
    moreList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFineList()
    this.getRepos()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      page: this.data.page + 1
    })
    this.getRepos(this.data.params)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getFineList(params = {}) {
    var that = this
    wx.request({
      url: 'http://shijingzhao.gz01.bdysite.com/index/ticket/getfine',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.statusCode == 200) {
          that.setData({
            fineList: res.data.result
          })
        }
      }
    })
  },

  onChange(e) {
    const {
      checkedItems,
      items,
      checkedValues
    } = e.detail
    this.setData({
      params: checkedValues
    })
    this.getRepos(checkedValues)
  },
  getRepos(params = {}) {
    if (this.data.page > this.data.maxPage) {
      console.log('页尾')
      return ;
    }
    const tType = params[0] || 0
    const period = params[1] || 0
    let q = "?page=" + this.data.page + "&tType=" + tType + "&period=" + period

    wx.showLoading()
    wx.request({
      url: `http://shijingzhao.gz01.bdysite.com/index/ticket/filterlist` + q,
      success: (res) => {
        wx.hideLoading()
        if (res.data.result.list) {
          this.setData({
            moreList: this.data.moreList.concat(res.data.result.list),
            maxPage: Math.ceil(res.data.result.total / 10)
          })
        }
      },
    })
  },
  onOpen(e) {
    this.setData({
      opened: true
    })
  },
  onClose(e) {
    this.setData({
      opened: false
    })
  },
  /**
   * 阻止触摸移动
   */
  noop() { },

  detail: function (event) {
    console.log(event.currentTarget.dataset)
  }
})