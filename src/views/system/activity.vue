<template>
    <div>
        <div class="gallery" v-show="visible">
            <el-button type="primary" size="small" @click="galleryVisible = true">创建新图库</el-button>
            <section>
                <div v-for="(item, index) in galleryData" :key="item.id" class="gallery-box">
                    <div class="gallery-top">
                        <el-button type="primary" icon="el-icon-edit" size="mini" plain circle
                            @click="handleEditGallery(item)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" plain circle
                            @click="handleGalleryDelete(item)"></el-button>
                    </div>
                    <div class="gallery-img" @click="handleGallery(item)">
                        <img :src="item.cover" alt="暂无图片显示">
                    </div>
                    <div class="gallery-bottom">{{ item.name }}</div>
                </div>
            </section>
        </div>
        <div class="photo" v-show="!visible">
            <el-button type="primary" size="small" @click="black">返回</el-button>
            <el-button type="primary" size="small" @click="photoVisible = true">上传</el-button>
            <section>
                <div v-for="(item, index) in photoData" :key="item.id" class="photo-box">
                    <div class="photo-top">
                        <el-button type="primary" icon="el-icon-setting" size="mini" plain circle
                            @click="handleEditPhoto(item)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" plain circle
                            @click="handleDelPhoto(item)"></el-button>
                    </div>
                    <div class="photo-img" @click="handlePhoto(item)">
                        <img :src="item.img" alt="">
                    </div>
                    <div class="photo-bottom">{{ item.name }}</div>
                </div>
            </section>
        </div>
        <el-dialog :title="galleryForm.id ? '更改图库内容' : '创建新图库'" :visible.sync="galleryVisible" width="40%">
            <el-form ref="form" :model="galleryForm" label-width="80px">
                <el-form-item label="图库名称">
                    <el-input v-model="galleryForm.name"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" :rows="2" placeholder="请输入描述内容" v-model="galleryForm.remark" />
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="galleryVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAddGallery">提 交</el-button>
            </span>
        </el-dialog>
        <el-dialog title="上传图片" :visible.sync="photoVisible" width="40%">
            <el-upload class="upload-demo" drag :headers="headers" :action="actionUrl" :before-upload="beforeUpload"
                :on-success="handleSuccess" multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-dialog>
        <el-dialog title="图片设置" :visible.sync="photoShezhiVisible" width="40%">
            <el-form ref="formPhoto" :model="photoForm" label-width="80px">
                <el-form-item label="">
                    <img style="width: 100%;" :src="photoForm.img" alt="">
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="photoForm.name"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" :rows="2" placeholder="请输入描述内容" v-model="photoForm.remark" />
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="photoShezhiVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleEditSubPhoto">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { safeCopyText } from '@/utils/common'
export default {
    data() {
        return {
            actionUrl: `${process.env.VUE_APP_SYS_API}/file/uploadImage`,
            headers: {
                Authorization: localStorage.getItem("token"),
                Accept: "application/json, text/plain, */*",
            },
            galleryVisible: false,
            galleryForm: {
                name: '',
                remark: '',
            },
            galleryData: [],
            visible: true,
            photoData: [],
            photoVisible: false,
            galleryId: 0,
            photoShezhiVisible: false,
            photoForm: {
                name: '',
                remark: '',
                img: '',
            }
        }
    },
    methods: {
        // 获取图库列表
        getGalleryList() {
            this.$http.get('/picture/getGallery', { params: { userId: JSON.parse(localStorage.getItem('user')).id } }).then(res => {
                if (res.data.code === 0) {
                    this.galleryData = res.data.data
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },
        // 添加/修改图库
        handleAddGallery() {
            this.$http.post('/picture/addGallery', { ...this.galleryForm, userId: JSON.parse(localStorage.getItem('user')).id }).then(res => {
                if (res.data.code === 0) {
                    this.galleryVisible = false
                    this.getGalleryList()
                    this.galleryForm = { name: '', remark: '' }
                    this.$message.success('操作成功')
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },
        getPhotoList() {
            this.$http.get('/picture/getPicture', { params: { galleryId: this.galleryId } }).then(res => {
                if (res.data.code === 0) {
                    this.photoData = res.data.data
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },
        black() {
            this.visible = true
            this.getGalleryList()
        },
        handleGallery(item) {
            this.visible = false
            this.galleryId = item.id
            this.getPhotoList()
        },
        beforeUpload(file) {
            // const isJPG = file.type === "image/jpeg" || file.type === "image/png";
            // const isLt5M = file.size / 1024 / 1024 < 5;

            // if (!isJPG) {
            //     MessagePlugin.error("上传图片只能是 JPG/PNG 格式!");
            // }
            // if (!isLt5M) {
            //     MessagePlugin.error("上传图片大小不能超过 5MB!");
            // }
            // return isJPG && isLt5M;
        },
        //上传图片功能
        handleSuccess(res, file) {
            console.log(res, '上传图片的回调');
            if (res.code == 0) {
                let str = res.data.split('/')
                this.$http.post('/picture/addPicture', { galleryId: this.galleryId, name: str[str.length - 1].split('.')[0], img: res.data }).then(res => {
                    if (res.data.code === 0) {
                        this.$message.success('上传成功')
                        this.photoVisible = false
                        this.getPhotoList()
                    } else {
                        this.$message.error(res.data.msg)
                    }
                })
            } else {
                this.$message.error('上传图片失败')
            }
        },
        handleGalleryDelete(item) {
            this.$confirm('确定要删除这个图库吗, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let result = await this.$http.get('/picture/deleteGallery', { params: { id: item.id } })
                if (result.data.code === 0) {
                    this.getGalleryList()
                    this.$message.success('删除成功')
                }
            }).catch(() => {
                this.$message.info('已取消删除')
            });
        },
        handleEditGallery(item) {
            this.galleryForm = { ...item }
            this.galleryVisible = true
        },
        handleDelPhoto(item) {
            this.$confirm('确定要删除这个图片吗, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let result = await this.$http.get('/picture/deletePicture', { params: { id: item.id } })
                if (result.data.code === 0) {
                    this.getPhotoList()
                    this.$message.success('删除成功')
                }
            }).catch(() => {
                this.$message.info('已取消删除')
            });
        },
        async handlePhoto(item) {
            const success = await safeCopyText(item.img)
            if (success) this.$message.success('图片地址已复制')
        },
        handleEditPhoto(item) {
            this.photoShezhiVisible = true
            Object.assign(this.photoForm, item)
        },
        handleEditSubPhoto() {
            this.$http.post("/picture/addPicture", this.photoForm).then(res => {
                console.log(res);
                if (res.data.code === 0) {
                    this.photoShezhiVisible = false
                    this.getPhotoList()
                    this.$message.success('操作成功')
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        }
    },
    created() {
        this.getGalleryList()
    },
}
</script>
<style>
@import url("//unpkg.com/element-ui@2.15.14/lib/theme-chalk/index.css");
</style>
<style lang="scss" scoped>
.gallery {
    section {
        display: flex;
        flex-wrap: wrap;
        margin-top: 15px;

        .gallery-box {
            border: 1px solid #d2d2d2;
            border-radius: 14px;
            width: 300px;
            margin-right: 18px;
            margin-bottom: 18px;
            position: relative;
            overflow: hidden;

            &:hover {
                .gallery-top {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    transition: 0.5s;
                }
            }

            .gallery-top {
                width: 100%;
                height: 50px;
                background-color: #404040;
                position: absolute;
                top: 0;
                left: 0;
                border-radius: 14px 14px 0 0;
                padding: 0 20px;
                box-sizing: border-box;
                display: none;
            }

            .gallery-img {
                height: 280px;
                width: 100%;
                cursor: pointer;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .gallery-bottom {
                height: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-top: 1px solid #d2d2d2;
            }
        }
    }
}

.photo {
    section {
        display: flex;
        flex-wrap: wrap;
        margin-top: 15px;

        .photo-box {
            border: 1px solid #d2d2d2;
            border-radius: 14px;
            width: 240px;
            margin-right: 18px;
            margin-bottom: 18px;
            position: relative;
            overflow: hidden;

            &:hover {
                .photo-top {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    transition: 0.5s;
                }
            }

            .photo-top {
                width: 100%;
                height: 40px;
                background-color: #404040;
                position: absolute;
                top: 0;
                left: 0;
                border-radius: 14px 14px 0 0;
                padding: 0 20px;
                box-sizing: border-box;
                display: none;
            }

            .photo-img {
                height: 220px;
                width: 100%;
                cursor: pointer;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .photo-bottom {
                height: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-top: 1px solid #d2d2d2;
            }
        }
    }
}
</style>