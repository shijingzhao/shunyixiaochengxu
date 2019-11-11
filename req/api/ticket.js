function install(req, request) {
  req.ticket = {
    getFilterList() {
      const url = `${req.apiUrl}ticket/filterlist?page=1`
      return request({
        url
      })
    },
    getFilterDetail(r) {
      const url = `${req.apiUrl}ticket/detail?tId=`+r
      return request({
        url
      })
    }
  };
}

module.exports = {
  install,
};