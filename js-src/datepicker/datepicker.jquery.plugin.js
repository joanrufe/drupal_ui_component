import App from './app'
import React from 'react'
import {render} from 'react-dom'
import 'react-datepicker/dist/react-datepicker.css'

(function($){
  $.fn.reactDatepicker = function (options) {
    const settings = $.extend(settings, options)
    var rendered = render( 
      <App />,
      this.get(0)
    )
    return this;
  }
  
  $.fn.reactDatepicker.defaults = {
    title: 'React DatePicker'
  }
})(jQuery)