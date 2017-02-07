<template>
  <div class="system-menu-wrapper" v-loading="loading" element-loading-text="拼命加载中...">
    <el-button class="addbtn" size="large" type="text" @click="addShowFrom()">添加菜单</el-button>
    <el-table :data="menuList" border style="width: 100%">
      <el-table-column label="菜单名称">
        <template scope="scope">
          <span :class="[scope.row.parent === 0 ? '' : 'left']">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="父级菜单">
        <template scope="scope">
          <span>{{ scope.row.parentName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="目录级别">
        <template scope="scope">
          <span>{{ scope.row.parent === 0 ? '一级目录':'二级目录' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="排序编号">
        <template scope="scope">
          <span>{{ scope.row.sort }}</span>
          <span v-show="scope.row.icon !== 'null'">( {{ scope.row.icon }} )</span>
        </template>
      </el-table-column>
      <el-table-column label="路由地址">
        <template scope="scope">
          <span>{{ scope.row.href }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" @click="updateShowFrom(scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="form.title" v-model="showForm">
      <el-form :model="form" :rules="rules" ref="formNode">
        <el-form-item label="菜单名称" prop="name">
          <span class="points">(菜单名称请勿重复)</span>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="父级目录">
          <span class="points">(本系统显示两层目录,请慎重)</span>
          <el-select v-model="form.parentid" placeholder="请选择父级目录">
            <el-option v-for="item in selectList" :label="item.key" :value="item.value"
                       v-show="form.id !== item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序编号" prop="sort">
          <el-input v-model.number="form.sort"></el-input>
        </el-form-item>
        <el-form-item label="分组菜单名称" prop="icon" v-show="form.parentid !== 0">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="路由地址" prop="href">
          <span class="points">(非开发人员请勿修改)</span>
          <el-input v-model="form.href"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showForm = false">取 消</el-button>
        <el-button type="primary" @click="handleForm('formNode')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        loading: false,
        showForm: false,
        form: {
          type: '',
          title: '',
          name: '',
          parentid: '',
          sort: 1,
          id: '',
          href: '',
          icon: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入菜单名称'}
          ],
          sort: [
            {required: true, message: '请输入排序编号'},
            {type: 'number', message: '排序编号必须为数字'}
          ],
          href: [
            {required: true, message: '请输入路由地址'}
          ],
          icon: [
            {required: true, message: '请输入菜单分组'}
          ]
        }
      };
    },
    created() {
      this.$store.dispatch('systemMenu/act/MENULIST', {Vue: this});
    },
    computed: {
      menuList () {
        return this.$store.getters['systemMenu/get/MENULIST'];
      },
      selectList () {
        return this.$store.getters['systemMenu/get/SELECTLIST'];
      }
    },
    methods: {
      handleDelete(row) {
        this.$confirm(`是否删除 (${row.name}) 目录`, '提示', {type: 'warning'}).then(() => {
          this.$store.dispatch('systemMenu/act/DELETEMENU', {id: row.id, Vue: this});
        }, () => {
          this.$message({type: 'info', message: '删除操作已取消'});
        });
      },
      handleForm(formNode) {
        if (this.form.parentid === 0) {
          this.form.icon = 'null';
        }
        this.$refs[formNode].validate((valid) => {
          if (valid) {
            this.showForm = false;
            if (this.form.type === 'add') {
              this.$store.dispatch('systemMenu/act/ADDMENU', {
                Vue: this,
                name: this.form.name,
                parentid: this.form.parentid,
                sort: this.form.sort,
                href: this.form.href,
                icon: this.form.icon
              });
            } else {
              this.$store.dispatch('systemMenu/act/UPDATEMENU', {
                Vue: this,
                id: this.form.id,
                name: this.form.name,
                parentid: this.form.parentid,
                sort: this.form.sort,
                href: this.form.href,
                icon: this.form.icon
              });
            }
          } else {
            return false;
          }
        });
      },
      addShowFrom() {
        this.showForm = true;
        this.form.type = 'add';
        this.form.id = '';
        this.form.parentid = 0;
        this.form.name = '';
        this.form.sort = 1;
        this.form.href = '';
        this.form.icon = '';
        this.form.title = '添加菜单';
      },
      updateShowFrom(row) {
        this.showForm = true;
        this.form.type = 'update';
        this.form.id = row.id;
        this.form.parentid = row.parent;
        this.form.name = row.name;
        this.form.sort = row.sort;
        this.form.href = row.href;
        this.form.icon = row.icon;
        this.form.title = '修改菜单';
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .system-menu-wrapper
    .addbtn
      padding: 11px 16px
      span
        font-weight: 600
    .left
      margin-left: 30px
    .el-dialog--small
      width: 600px
      .el-select
        width: 100%
</style>
