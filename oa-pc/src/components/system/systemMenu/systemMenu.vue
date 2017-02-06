<template>
  <div class="system-menu-wrapper" v-loading="loading" element-loading-text="拼命加载中...">
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
          <span v-show="scope.row.icon">( {{ scope.row.icon }} )</span>
        </template>
      </el-table-column>
      <el-table-column label="路由地址">
        <template scope="scope">
          <span>{{ scope.row.href }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template scope="scope">
          <el-button size="small" @click="updateShowFrom(scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          <el-button v-if="scope.row.parent === 0" size="small" @click="addShowFrom(scope.row)">
            添加
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="form.title" v-model="showForm">
      <el-form :model="form" :rules="rules" ref="formNode">
        <el-form-item label="菜单名称( 菜单名称请勿重复 )" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="父级目录">
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
        <el-form-item label="路由地址( 非开发人员请勿修改 )" prop="href">
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
        this.$confirm('此操作将永久删除该目录, 是否继续?', '提示', {type: 'warning'}).then(() => {
          this.$store.dispatch('systemMenu/act/DELETEMENU', {id: row.id, Vue: this});
        }, () => {
          this.$message({type: 'info', message: '已取消删除操作'});
        });
      },
      handleForm(formNode) {
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
      addShowFrom(row) {
        this.showForm = true;
        this.form.type = 'add';
        this.form.id = '';
        this.form.parentid = row.id;
        this.form.name = '';
        this.form.sort = 1;
        this.form.href = '';
        this.form.icon = row.icon;
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
        this.form.title = '编辑菜单';
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .system-menu-wrapper
    .left
      margin-left: 30px
    .el-dialog--small
      width: 500px
      .el-select
        width: 100%
</style>
