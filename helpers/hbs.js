const moment = require('moment');

module.exports = {
  formatDate: function(date, format){
    return moment(date).format(format);
  },
  truncate: function (str, len){
    if( str.length > len && str.length > 0){
      let newStr = str + ' ';
      newStr = str.substr(0, len);
      newStr = str.substr(0, newStr.lastIndexOf(' '));
      newStr = newStr.length > 0 ? newStr : str.substr(0, len);
      return newStr + '...'
    }
    return str;
  },
  stripTags: function(input){
    return input.replace(/<(?:.|\n)*?>/gm, '');
  },
  editIcon: function(contentUser, loggedUser, contentId, floating = true){
    if(contentUser._id.toString() == loggedUser._id.toString()){
      if(floating){
        return `<a href="/content/edit/${contentId}" class="btn-floating halfway-fab blue">
                <i class="fas fa-edit fa-small"></i></a>`;
      } else{
        return `<a href="/content/edit/${contentId}><i class="fas fa-edit"></i></a>`;
      }
    }else{
      return '';
    }
  },
  select: function(selected, options){
    return options
    .fn(this)
    .replace(
      new RegExp(' value="' + selected + '"'),
      '$& selected="selected"',
    )
    .replace(
      new RegExp('>' + selected + '</options>'),
      ' selected="selected"$&'
    )
  },
}
