function install(req, request) {
  req.ticket = {
    getFilterList() {
      const url = `${req.apiUrl}ticket/filterlist?page=1`
      return request({
        url
      })
    },
    getFilterDetail() {
      const url = `${req.apiUrl}ticket/detail?tId=1`
      return request({
        url
      })
    }
  };
}

module.exports = {
  install,
};