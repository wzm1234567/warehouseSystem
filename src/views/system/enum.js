export const grantMap = {
  roleConfig: [
    {
      isIndex: true,
      label: "序号",
    },
    {
      label: "角色名称",
      prop: "name",
    },
    {
      label: "角色编码",
      prop: "code",
    },
    {
      label: "创建时间",
      prop: "create_time",
    },
    {
      label: "角色描述",
      prop: "note",
    },
    {
      isSlot: true,
      slotName: "action",
      label: "操作",
      width: "300px",
    },
  ],
  dictConfigLeft: [
    {
      isIndex: true,
    },
    // {
    //   label: "字典名称",
    //   prop: "type_name",
    // },
    // {
    //   label: "字典编码",
    //   prop: "type_code",
    // },
    {
      isSlot: true,
      slotName: "type_name",
      label: "字典名称",
    },
  ],
  dictConfigRight: [
    {
      label: "ID",
      prop: "id",
      width: "55",
    },
    {
      label: "字典项名称",
      prop: "item_name",
    },
    {
      label: "字典项值",
      prop: "item_code",
    },
    {
      isSlot: true,
      slotName: "action",
      label: "操作",
      width: "300px",
    }
  ]
};
