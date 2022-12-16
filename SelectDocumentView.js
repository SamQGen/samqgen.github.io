import { r as resolveComponent, o as openBlock, c as createBlock, w as withCtx, a as createVNode, u as unref, b as createTextVNode, p as pushScopeId, d as popScopeId, e as createBaseVNode } from "./index.js";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const SelectDocumentView_vue_vue_type_style_index_0_scoped_d21a62f1_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-d21a62f1"), n = n(), popScopeId(), n);
const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("h1", null, "Select Document", -1));
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", {
  slot: "header",
  class: "clearfix"
}, [
  /* @__PURE__ */ createBaseVNode("h2", null, "Passport")
], -1));
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("h2", null, "Select", -1));
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", {
  slot: "header",
  class: "clearfix"
}, [
  /* @__PURE__ */ createBaseVNode("h2", null, "Nationl ID Card")
], -1));
const _hoisted_5 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", {
  slot: "header",
  class: "clearfix"
}, [
  /* @__PURE__ */ createBaseVNode("h2", null, "Driving License")
], -1));
const _sfc_main = {
  __name: "SelectDocumentView",
  setup(__props) {
    let selectDocument = (document) => {
      console.log("select document hit", document);
    };
    return (_ctx, _cache) => {
      const _component_el_image = resolveComponent("el-image");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_card = resolveComponent("el-card");
      const _component_el_row = resolveComponent("el-row");
      return openBlock(), createBlock(_component_el_card, { class: "main-card" }, {
        header: withCtx(() => [
          _hoisted_1
        ]),
        default: withCtx(() => [
          createVNode(_component_el_row, null, {
            default: withCtx(() => [
              createVNode(_component_el_card, {
                shadow: "never",
                class: "box-card"
              }, {
                default: withCtx(() => [
                  _hoisted_2,
                  createVNode(_component_el_image, {
                    src: "https://qgen-identity.s3.eu-central-1.amazonaws.com/passport.png",
                    fit: "cover"
                  }),
                  createVNode(_component_el_button, {
                    plain: "",
                    onClick: _cache[0] || (_cache[0] = ($event) => unref(selectDocument)("passport"))
                  }, {
                    default: withCtx(() => [
                      _hoisted_3
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_el_row, null, {
            default: withCtx(() => [
              createVNode(_component_el_card, {
                shadow: "never",
                class: "box-card"
              }, {
                default: withCtx(() => [
                  _hoisted_4,
                  createVNode(_component_el_image, {
                    src: "https://qgen-identity.s3.eu-central-1.amazonaws.com/id-card.png",
                    fit: "cover"
                  }),
                  createVNode(_component_el_button, {
                    type: "primary",
                    onClick: _cache[1] || (_cache[1] = ($event) => unref(selectDocument)("id-card"))
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Select")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_el_row, null, {
            default: withCtx(() => [
              createVNode(_component_el_card, {
                shadow: "never",
                class: "box-card"
              }, {
                default: withCtx(() => [
                  _hoisted_5,
                  createVNode(_component_el_image, {
                    src: "https://qgen-identity.s3.eu-central-1.amazonaws.com/driving-license.png",
                    fit: "cover"
                  }),
                  createVNode(_component_el_button, {
                    type: "primary",
                    onClick: _cache[2] || (_cache[2] = ($event) => unref(selectDocument)("driving-license"))
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Select")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
};
const SelectDocumentView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d21a62f1"]]);
export {
  SelectDocumentView as default
};
