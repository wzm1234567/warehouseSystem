<template>
    <div class="home">
        <editor-vue id="myedit" ref="editor" v-model="msg" :initEditor="initEditor" @onClick="onClick" />




        <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">

            <el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success"
                    @click="submitUpload">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">请上传pdf文件</div>
            </el-upload>


            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">关 闭</el-button>
            </span>
        </el-dialog>




    </div>
</template>

<script>
    // @ is an alias to /src
    import editorVue from '../../components/TinymceEditor.vue'

    export default {
        name: 'HomeView',
        components: {
            editorVue
        },
        data() {
            return {
                msg: 'Welcome to Use Tinymce Editor',
                dialogVisible: false,
                fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
            }
        },
        computed: {
            initEditor() {
                let that = this
                return {
                    height: 300,
                    branding: false,
                    skin_url: '/tinymce/skins/ui/oxide',
                    content_css: '/tinymce/skins/content/default/content.css',
                    language_url: '/tinymce/langs/zh_CN.js',
                    language: 'zh_CN',
                    plugins: 'code print preview fullscreen paste searchreplace save autosave link autolink image imagetools media table codesample lists advlist hr charmap emoticons anchor directionality pagebreak quickbars nonbreaking visualblocks visualchars wordcount',
                    toolbar: 'fullscreen preview code | undo redo | forecolor backcolor | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | cut copy paste | outdent indent blockquote | numlist bullist |  styleselect fontselect fontsizeselect| myCustomToolbarButton | removeformat | link unlink image media emoticons charmap anchor pagebreak codesample | ltr rtl | pdf',
                    toolbar_drawer: 'sliding',
                    images_upload_handler: (blobInfo, success, error) => {
                        let file = blobInfo.blob();
                        // 使用axios上传
                        const formData = new FormData();
                        formData.append('file', file, file.name);
                        this.$http.post('/upload/uploadImage', formData).then(res => {
                            if (res.data.code == 0) {
                                success(res.data.data);
                            } else {
                                error(res.data.msg);
                            }
                        }).catch(e => {
                            console.error(e);
                            error(e.message);
                        });
                    },
                    // resVideo:'',    //上传视频的url
                    // uploaded:false,//有没有上传完成
                    file_picker_types: 'media',
                    file_picker_callback: (callback, value, meta) => {

                    },
                    setup: function (editor) {

                        editor.ui.registry.addButton('myCustomToolbarButton', {
                            text: 'pdf',
                            onAction: () => {
                                console.log(6666);
                                console.log(that.dialogVisible);

                                that.dialogVisible = true
                            }
                        });
                    }
                }
            }
        },
        methods: {
            // 内容
            getContent() {
                console.log('内容', this.msg)
            },
            // 鼠标单击的事件
            onClick(e, editor) {
                console.log('Element clicked')
                console.log(e)
                console.log(editor)
            },
            // 清空内容
            clear() {
                console.log(this.$refs.editor)
                this.$refs.editor.clear()
            },

            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                        this.dialogVisible = false;
                    })
                    .catch(_ => { });
            },



            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            }
        }

    }
</script>

<style lang="scss" scoped>
    .home {
        display: flex;

        .preview {
            flex: 1;
            border: 2px solid tomato;
        }
    }
</style>