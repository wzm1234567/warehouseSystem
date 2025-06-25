<template>
  <div class="tinymce-editor">
    <editor id="tiny-editor" v-model="myValue" :init="config" :disabled="disabled" @onClick="onClick"></editor>
  </div>
</template>
<script>
  // 引入组件
  import tinymce from 'tinymce'
  import Editor from '@tinymce/tinymce-vue'

  // 引入富文本编辑器主题的js和css
  import 'tinymce/skins/content/default/content.css'
  import 'tinymce/themes/silver'
  import 'tinymce/icons/default/icons' // 解决了icons.js 报错问题，不用定制icon可以忽略

  // 编辑器扩展插件plugins
  import 'tinymce/plugins/paste' // 粘贴插件
  import 'tinymce/plugins/image' // 上传图片插件
  // import 'tinymce/plugins/media'// 插入视频插件
  import 'tinymce/plugins/link' // 超链接
  import 'tinymce/plugins/code' // 源码
  import 'tinymce/plugins/table' // 插入表格插件
  import 'tinymce/plugins/lists' // 列表插件
  import 'tinymce/plugins/wordcount' // 字数统计插件
  import 'tinymce/plugins/preview' // 预览

  export default {
    components: {
      Editor
    },
    props: {
      value: {
        // 默认的富文本内容
        type: String,
        default: ''
      },
      disabled: {
        // 禁用
        type: Boolean,
        default: false
      },
      // plugins: { // 需要使用的插件
      //   type: [String, Array],
      //   default: 'link paste lists image code table wordcount'
      // },
      // toolbar: { // 工具栏显示配置
      //   type: [String, Array],
      //   default:
      //     'bold italic underline strikethrough | styleselect fontsizeselect fontselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | cut copy paste | bullist numlist | outdent indent blockquote | undo redo | link unlink code | removeformat'
      // },

      initEditor:{ // 初始化编辑器 父组件传递
        type:Object,
        default:{
          language_url: '/tinymce/langs/zh_CN.js', // 语言包路径
         language: 'zh_CN', // 语言
         skin_url: '/tinymce/skins/ui/oxide', // 主题路径
         height: '700px',
         width: 600,
         // plugins: 'code print preview fullscreen paste searchreplace save autosave link autolink image imagetools media table codesample lists advlist hr charmap emoticons anchor directionality pagebreak quickbars nonbreaking visualblocks visualchars wordcount',
         // toolbar: 'fullscreen preview code | undo redo | forecolor backcolor | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | formatselect fontselect fontsizeselect| myCustomToolbarButton | link image media emoticons charmap anchor pagebreak codesample | ltr rtl | pdf',
         plugins: 'link paste lists image code table wordcount', // 指定需加载的插件
         toolbar: 'bold italic underline strikethrough | styleselect fontsizeselect fontselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | cut copy paste | bullist numlist | outdent indent blockquote | undo redo | link unlink code | removeformat', // 自定义工具栏
        //  plugins: this.plugins, // 指定需加载的插件
        //  toolbar: this.toolbar, // 自定义工具栏
         toolbar_drawer: 'sliding',
         toolbar_mode: 'sliding',
         branding: false, // 技术支持(Powered by Tiny || 由Tiny驱动)
         menubar: true, // 菜单栏
         theme: 'silver', // 默认主题
         zIndex: 1101,
         style_formats: [{ title: '首行缩进', block: 'p', styles: { 'text-indent': '2em' } }],
         style_formats_merge: true,
         content_css: '/tinymce/tinymce.css', // 为编辑区指定css文件,该参数的值是你的css文件路径，可使用绝对路径或相对路径。
         images_upload_handler: (blobInfo, success, error) => {
           let file = blobInfo.blob();
           // 使用axios上传
           const formData = new FormData();
           formData.append('file', file, file.name);
          //  this.$http.post('/upload/uploadImage', formData).then(res => {
          //    if (res.data.code == 0) {
          //      success(res.data.data);
          //    } else {
          //      error(res.data.msg);
          //    }
          //  }).catch(e => {
          //    console.error(e);
          //    error(e.message);
          //  });
         },
         file_picker_types: 'media',
         file_picker_callback: (callback, value, meta) => {

         },
        },
      }
    },
    watch: {
      value(newValue) {
        this.myValue = newValue
      },
      myValue(newValue) {
        this.$emit('input', newValue)
      }
    },
    data() {
      return {
        
        myValue: this.value,

        config:this.initEditor

      }
    },
    computed:{
      // init(){
      
      //   return{
         
      //    language_url: '/tinymce/langs/zh_CN.js', // 语言包路径
      //    language: 'zh_CN', // 语言
      //    skin_url: '/tinymce/skins/ui/oxide', // 主题路径
      //    height: '700px',
      //    width: 400,
      //    // plugins: 'code print preview fullscreen paste searchreplace save autosave link autolink image imagetools media table codesample lists advlist hr charmap emoticons anchor directionality pagebreak quickbars nonbreaking visualblocks visualchars wordcount',
      //    // toolbar: 'fullscreen preview code | undo redo | forecolor backcolor | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | formatselect fontselect fontsizeselect| myCustomToolbarButton | link image media emoticons charmap anchor pagebreak codesample | ltr rtl | pdf',
      //    plugins: 'link paste lists image code table wordcount', // 指定需加载的插件
      //    toolbar: 'bold italic underline strikethrough | styleselect fontsizeselect fontselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | cut copy paste | bullist numlist | outdent indent blockquote | undo redo | link unlink code | removeformat', // 自定义工具栏
      //   //  plugins: this.plugins, // 指定需加载的插件
      //   //  toolbar: this.toolbar, // 自定义工具栏
      //    toolbar_drawer: 'sliding',
      //    toolbar_mode: 'sliding',
      //    branding: false, // 技术支持(Powered by Tiny || 由Tiny驱动)
      //    menubar: true, // 菜单栏
      //    theme: 'silver', // 默认主题
      //    zIndex: 1101,
      //    style_formats: [{ title: '首行缩进', block: 'p', styles: { 'text-indent': '2em' } }],
      //    style_formats_merge: true,
      //    content_css: '/tinymce/tinymce.css', // 为编辑区指定css文件,该参数的值是你的css文件路径，可使用绝对路径或相对路径。
      //    images_upload_handler: (blobInfo, success, error) => {
      //      let file = blobInfo.blob();
      //      // 使用axios上传
      //      const formData = new FormData();
      //      formData.append('file', file, file.name);
      //     //  this.$http.post('/upload/uploadImage', formData).then(res => {
      //     //    if (res.data.code == 0) {
      //     //      success(res.data.data);
      //     //    } else {
      //     //      error(res.data.msg);
      //     //    }
      //     //  }).catch(e => {
      //     //    console.error(e);
      //     //    error(e.message);
      //     //  });
      //    },
      //    file_picker_types: 'media',
      //    file_picker_callback: (callback, value, meta) => {

      //    },
      //  }
     
      // }
    
    
    },
    mounted() {
      // tinymce.init({})
      // console.log(this.config);
      
    },
    methods: {
      calcWidth() {
        return document.body.clientWidth / 2 + 'px'
      },
      onClick(e) {
        this.$emit('onClick', e, tinymce)
      },
      clear() {
        this.myValue = ''
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>