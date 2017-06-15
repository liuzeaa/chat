/**
 * Created by liuze on 2017/6/13.
 */
//   /^(?![a-zA-Z_]+$)(?![\da-z_+$])(?![\dA-Z_]+$])\w+/ 密码正则表达式  必须包含大小写和下划线
(function(root,factory,plug){
    factory.call(root,root.jQuery,plug);
})(this,function($,plug){
    var __DEFAULT__ = {
        Event:'change',
        message:"has error",
        showMessage:function($field,message){
            $field.after("<p class='text-danger'>"+message+"</p>");
        }
    }
    var __RULES__ = {
        "require":function(){
            return this.val()!="";
        },
        "email":function(){
            return /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(this.val());
        },
        "mobile":function(){
            return /^1(3|4|5|7|8)\d{9}$/.test(this.val());
        },
        "regex":function(){
            return new RegExp(this.data("bv-regex")).test(this.val());
        },
        "amount":function(){
            return /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(this.val());
        },
        "min":function(){
            return true;
        },
        "max":function(){
            return true;
        }
    }
    $.fn[plug] = function(options){
        if(!this.is('form'))throw  new Error('必须针对form表单使用');
        $fields = this.find('input');
        var that  = this;
        $.extend(this,__DEFAULT__,options)
        $fields.on(this.Event,function(){
            $field  = $(this);
            $field.next('.text-danger').remove();
            var $group = $field.parents('.form-group').removeClass('has-success has-error');
            var results  = true; //默认结果
            $.each(__RULES__,function(rule,validate){
               if( $field.data("bv-"+rule)){
                   results  = validate.call($field);
                   $group.addClass(results?"has-success":"has-error");
                   (!results)&&that.showMessage($field,($field.data('bv-'+rule+'message')||message));
                   return results;
               }
            })
        })
    }
    $.fn[plug].extendRule = function(rules){
        $.extend(__RULES__,rules);
    }
},'bootstrapValidor');