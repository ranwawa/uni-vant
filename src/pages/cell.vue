<!-- author: ranwawa -->
<!-- since: 2020/2/20 -->
<!-- desc:  -->
<!-- remark:  -->
<template>
  <view class="uv-doc">
    <uv-section title="基础用法">
      <uv-cell-group>
        <uv-cell
          value="内容"
          title="单元格"
        />
        <uv-cell
          value="内容"
          title="单元格"
          label="描述信息"
          :border="false"
        />
      </uv-cell-group>
    </uv-section>
    <uv-section title="单元格大小">
      <uv-cell
        value="内容"
        title="单元格"
        size="large"
      />
      <uv-cell
        value="内容"
        title="单元格"
        size="large"
        label="描述信息"
      />
    </uv-section>
    <uv-section title="展示图标">
      <uv-cell
        title="单元格"
        icon="location-o"
      />
    </uv-section>
    <uv-section title="展示箭头">
      <uv-cell title="单元格" is-link />
      <uv-cell title="单元格" is-link value="内容" />
      <uv-cell title="单元格" is-link value="内容" arrow-direction="down" />
    </uv-section>
    <uv-section title="页面跳转">
      <uv-cell
        is-link
        title="单元格"
        link-type="redirectTo"
        url="/pages/index"
      />
    </uv-section>
    <uv-section title="分组标题">
      <uv-cell-group title="分组1">
        <uv-cell title="单元格" value="内容" />
      </uv-cell-group>
      <uv-cell-group title="分组2">
        <uv-cell title="单元格" value="内容" />
      </uv-cell-group>
    </uv-section>
    <uv-section title="使用插槽">
      <uv-cell value="内容" icon="shop-o" is-link>
        <view slot="title">
          <view class="uv-cell-text">单元格</view>
          <!--<uv-tag type="danger">标签</uv-tag>-->
        </view>
      </uv-cell>
      <uv-cell title="单元格">
        <uv-icon slot="right-icon" name="search" class="custom-icon" />
      </uv-cell>
    </uv-section>
    <uv-section title="垂直居中">
      <uv-cell center title="单元格" value="内容" label="描述信息" />
    </uv-section>
  </view>
</template>
<script>
import uvCell from '@/components/cell.vue';
import uvIcon from '@/components/icon.vue';
import uvCellGroup from '@/components/cell-group.vue';

export default {
  name: 'cell',
  components: {
    uvIcon,
    uvCell,
    uvCellGroup,
  },
};
</script>
<style
  lang="scss"
  scoped
>

</style>
