<template>
  <div class="system-company-wrapper" v-loading="loading" element-loading-text="拼命加载中...">
    <el-button class="addbtn" size="large" type="text" @click="addShowFrom()">添加商户</el-button>
    <el-table :data="companyList" border style="width: 100%">
      <el-table-column label="商户名称">
        <template scope="scope">
          <span>{{ scope.row.companyname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="简写名称">
        <template scope="scope">
          <span>{{ scope.row.companydisplayname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商户描述">
        <template scope="scope">
          <span>{{ scope.row.describe }}</span>
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
        <el-form-item label="商户名称" prop="companyname">
          <span class="points">(商户名称请勿重复)</span>
          <el-input v-model="form.companyname"></el-input>
        </el-form-item>
        <el-form-item label="简写名称" prop="companydisplayname">
          <el-input v-model.number="form.companydisplayname"></el-input>
        </el-form-item>
        <el-form-item label="商户描述">
          <el-input v-model="form.describe"></el-input>
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
          id: '',
          companyname: '',
          companydisplayname: '',
          describe: ''
        },
        rules: {
          companyname: [
            {required: true, message: '请输入商户名称'}
          ],
          companydisplayname: [
            {required: true, message: '请输入名称简写'}
          ]
        }
      };
    },
    created() {
      this.$store.dispatch('systemCompany/act/COMPANYLIST', {Vue: this});
    },
    computed: {
      companyList () {
        return this.$store.getters['systemCompany/get/COMPANYLIST'];
      }
    },
    methods: {
      handleDelete(row) {
        this.$confirm(`是否删除 (${row.companyname}) 商户`, '提示', {type: 'warning'}).then(() => {
          this.$store.dispatch('systemCompany/act/DELETECOMPANY', {id: row.id, Vue: this});
        }, () => {
          this.$message({type: 'info', message: '删除操作已取消'});
        });
      },
      handleForm(formNode) {
        this.$refs[formNode].validate((valid) => {
          if (valid) {
            this.showForm = false;
            if (this.form.type === 'add') {
              this.$store.dispatch('systemCompany/act/ADDCOMPANY', {
                Vue: this,
                companyname: this.form.companyname,
                companydisplayname: this.form.companydisplayname,
                describe: this.form.describe
              });
            } else {
              this.$store.dispatch('systemCompany/act/UPDATCOMPANY', {
                Vue: this,
                id: this.form.id,
                companyname: this.form.companyname,
                companydisplayname: this.form.companydisplayname,
                describe: this.form.describe
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
        this.form.title = '添加商户';
        this.form.companyname = '';
        this.form.companydisplayname = '';
        this.form.describe = '';
      },
      updateShowFrom(row) {
        this.showForm = true;
        this.form.type = 'update';
        this.form.title = '修改商户';
        this.form.id = row.id;
        this.form.companyname = row.companyname;
        this.form.companydisplayname = row.companydisplayname;
        this.form.describe = row.describe;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .system-company-wrapper
    .addbtn
      padding: 11px 16px
      span
        font-weight: 600
    .el-dialog--small
      width: 600px
</style>
