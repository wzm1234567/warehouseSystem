<template>
    <div class="gis-container">
      <div id="gismap" style="width: 100%; height: calc(94vh - 30px)">
        <div class="top-btn">
          <el-button @click="show_overlay_two">显示覆盖物</el-button>
          <el-button @click="hide_overlay_two">隐藏覆盖物</el-button>
          <el-button @click="center_point">回到中心点</el-button>
          <el-button @click="show_PointLayer">显示标记图层</el-button>
          <el-button @click="hide_PointLayer">隐藏标记图层</el-button>
          <el-button @click="open_satelliteLayer">打开卫星图层</el-button>
          <el-button @click="closed_satelliteLayer">关闭卫星图层</el-button>
          <!-- <el-button @click="draw">画线</el-button> -->
          <el-select
            v-model="select"
            placeholder="请选择"
            @change="draw_event"
            style="width: 120px;"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div id="swipeContainer">
          <div id="swipeDiv">
            <div class="handle"></div>
          </div>
        </div>
  
        <div
          class="block"
          style="position: absolute;bottom: 10px;left: 1%;width: 98vw;z-index: 9999;"
          v-show="satelliteLayer != null"
        >
          <el-slider
            @input="formatTooltip"
            v-model="swipeVal"
            :show-tooltip="false"
          ></el-slider>
        </div>
      </div>
      <div id="marker">
        <div id="content">{{ point_text }}</div>
        <div class="arrow"></div>
      </div>
      <div id="overlay_two" style="background-color: #fff;">9999999999999</div>
  
      <div id="tooltip_overlay_1">
        <div id="tooltip_content">{{ tooltip_text }}</div>
      </div>
  
      <div id="tooltip_overlay_2">
        <div id="tooltip_content">{{ tooltip_text }}</div>
      </div>
    </div>
  </template>
  
  <script>
  import jsonData from "@/assets/TJ.json";
  // import days_to_china_json from "@/assets/days_to_china.json";
  import markerUrl from "@/assets/marker.gif";
  import "ol/ol.css";
  import Map from "ol/Map.js";
  import View from "ol/View";
  import Feature from "ol/Feature";
  import { Tile as TileLayer, Vector as VectorLayer, Marker } from "ol/layer";
  import { OSM, Vector as VectorSource } from "ol/source";
  import Overlay from "ol/Overlay";
  // import { Draw, Modify, Snap } from "ol/interaction";
  
  import Draw, { createRegularPolygon, createBox } from "ol/interaction/Draw";
  import Point from "ol/geom/Point";
  import XYZ from "ol/source/XYZ";
  import VectorTile from "ol/source/VectorTile";
  // import {VectorLayer} from "ol/layer/Vector";
  import format from "ol/format/GeoJSON";
  import { fromLonLat, transform } from "ol/proj";
  // import VectorSource from "ol/source/Vector";
  import GeoJSON from "ol/format/GeoJSON";
  // import Circle from "ol/geom/Circle";
  import Polygon from "ol/geom/Polygon";
  // import Marker from 'ol/layer/Marker';
  import LineString from "ol/geom/LineString";
  import geometry from "ol/geom/Geometry";
  import { getLength, getArea } from "ol/sphere";
  // import { getArea } from 'ol/sphere';
  import { getRenderPixel } from "ol/render.js";
  
  import { Style, Fill, Stroke, Text, Icon } from "ol/style";
  import WKT from "ol/format/WKT";
  import Select, { SelectEvent } from "ol/interaction/Select";
  
  // import "ol/ol.css";
  // import Map from "ol/Map";
  // import View from "ol/View";
  // import Feature from "ol/Feature";
  // import Point from "ol/geom/Point";
  // import { Style, Icon, Stroke } from "ol/style";
  // import TileLayer from "ol/layer/Tile";
  // import XYZ from "ol/source/XYZ";
  // import VectorLayer from "ol/layer/Vector";
  // import VectorSource from "ol/source/Vector";
  // import GeoJSON from "ol/format/GeoJSON.js";
  // import { fromLonLat } from "ol/proj";
  // import OSM from 'ol/source/OSM';
  
  export default {
    data() {
      return {
        map: null, //地图对象
        zoom: 9, //缩放级别
        // markerUrl: require("@/assets/marker.gif"), //地图上实现 点
        // markerUrl: require("@/assets/map-marker.png"), //地图上实现 点
        overlay: null, // 覆盖物 实例(用于展示点位上方的覆盖物弹框)
        point_text: null,
        layer_line: null, // 矢量图层 保存画的线
        layer_polygon: null, // 矢量图层 保存画的多边形
        layer_circle: null, // 矢量图层 保存画的圆
        overlay_two: null, // 覆盖物dom
        tooltip_overlay: null, //创建覆盖物 弹出框 用于显示 tooltip （测量工具提示框）
        tooltip_text: "", //创建覆盖物 弹出框 用于显示内容 tooltip （测量工具提示框）
        PointLayer: null, // 点位图层
        satelliteLayer: null, // 卫星图层
        swipeVal: 0,
        // source: new VectorTile({
        //   // wrapX: false // 禁止横向无限重复（底图渲染的时候会横向无限重复），设置了这个属性，可以让绘制的图形不跟随底图横向无限重复
        // }),
        options: [
          {
            value: "Point",
            label: "点"
          },
          {
            value: "LineString",
            label: "线"
          },
          {
            value: "Polygon",
            label: "多边形"
          },
          {
            value: "Circle",
            label: "圆"
          },
          {
            value: "None",
            label: "重置"
          }
        ],
        select: "",
        draw: null,
  
        line_temporaryinfo: [],
        line_info: [],
        Polygon_temporaryinfo: [],
        Polygon_info: [],
  
        Circle_temporaryinfo: [],
        Circle_info: [],
  
        tooltip_overlay_line: []
      };
    },
    created() {},
    mounted() {
      // 4326转换3857
      const point3857_center = fromLonLat([117.190182, 39.435596]);
  
      // 把天津json文件数据更改3857格式
      let TJarr = [];
      jsonData.features[0].geometry.coordinates[0][0].forEach(item => {
        TJarr.push(fromLonLat(item));
      });
      jsonData.features[0].geometry.coordinates[0][0] = TJarr;
  
      // 创建map实例
      this.map = new Map({
        target: "gismap",
        view: new View({
          center: point3857_center, // 中心点经纬度
          // center: [117.190182, 39.125596], // 中心点经纬度
          zoom: 6, // 图层缩放大小
          maxZoom: 18,
          minZoom: 1,
          //1.设置缩放级别为整数
          constrainResolution: true,
          //2.关闭无级缩放地图
          smoothResolutionConstraint: false,
          // projection: "EPSG:4326"
          projection: "EPSG:3857"
        }),
  
        // renderer: "canvas", // 或者 'webgl'，并设置抗锯齿
        // renderOptions: {
        //   antialias: true
        // },
  
        //图层
        layers: [
          new TileLayer({
            source: new XYZ({
              url:
                // "http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=92843da163a04bbb9b51511319d78c9a"
                "http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=92843da163a04bbb9b51511319d78c9a"
  
              // format: new format.GeoJSON()
              // maxResolution: 0.703125 // 设置最大分辨率
            })
          })
        ]
      });
  
      this.center_point();
  
      this.add_annotation();
      this.drawAdministrativeAreas();
  
      this.drawPoint();
      // this.drawLine();
      this.marker();
      this.cover_dom();
  
      this.Tooltip();
  
      // this.drawPolygon();
    },
    computed: {},
    watch: {
      line_temporaryinfo: {
        // 监听绘制线的临时数据
        deep: true,
        // immediate: true,
        handler(newVal, oldVal) {
          console.log(oldVal);
  
          if (!oldVal) {
            this.line_info.push(oldVal);
          }
          this.line_info.push(newVal);
  
          console.log(this.line_info);
  
          this.drawLine();
        }
      },
      Polygon_temporaryinfo: {
        // 监听绘制多边形的临时数据
        deep: true,
        // immediate: true,
        handler(newVal, oldVal) {
          console.log(oldVal);
  
          if (!oldVal) {
            this.Polygon_info.push(oldVal);
          }
          this.Polygon_info.push(newVal);
  
          console.log(this.Polygon_info);
  
          this.drawPolygon();
        }
      },
      Circle_temporaryinfo: {
        // 监听绘制圆或矩形的临时数据
        deep: true,
        // immediate: true,
        handler(newVal, oldVal) {
          console.log(oldVal);
  
          if (!oldVal) {
            this.Circle_info.push(oldVal);
          }
          this.Circle_info.push(newVal);
  
          console.log(this.Circle_info);
  
          this.drawCircle();
        }
      }
    },
    methods: {
      /* 实现天津行政的边界 */
      drawAdministrativeAreas() {
        let baseVector = new VectorLayer({
          source: new VectorSource({
            // format: new GeoJSON(),
            // url: jsonData,
            features: new GeoJSON().readFeatures(jsonData, {
              // dataProjection: "EPSG:4326",
              // featureProjection: "EPSG:4326"
            })
          }),
          style: new Style({
            stroke: new Stroke({
              color: "red",
              width: 2
              // width:30,
              // color:'rgba(170,170,170,0.4)'
            }),
            fill: new Fill({
              // color:'rgba(121, 208, 235, 0.5)'
              color: "rgba(255, 0, 0, 0)"
            })
          }),
          zIndex: 2
          // style: {
          // 	'fill-color': 'rgba(255, 0, 0, 0.3)',
          // 	'stroke-color': 'rgba(255, 0, 0, 0.9)',
          // 	'stroke-width': 0.5,
          // },
        });
  
        this.map.addLayer(baseVector);
      },
  
      /* 地图上创建图层  图层上实现 点 */
      drawPoint() {
        /**
         * 方法一
         *
         * **/
  
        let marker = [];
  
        let markerdata = [
          [116.411794, 39.9068],
          [117.411794, 39.9068],
          [117.66494, 38.897095]
        ];
  
        markerdata.forEach((item, index) => {
          marker.push(
            new Feature({
              name: "点位" + (index + 1),
              id: index + 1,
              geometry: new Point(fromLonLat(item))
            })
          );
        });
  
        this.PointLayer = new VectorLayer({
          hitDetection: true,
          source: new VectorSource({
            features: marker
            // features: [new Feature(new Point(fromLonLat([116.411794, 39.9068]))),new Feature(new Point(fromLonLat([117.411794, 39.9068])))]
          }),
          style: new Style({
            image: new Icon({
              anchor: [0.5, 0.9],
              anchorXUnits: "fraction",
              anchorYUnits: "fraction",
              src: markerUrl,
              scale: 0.15
            })
          }),
          zIndex: 2
        });
  
        this.map.addLayer(this.PointLayer);
  
        /**
         * 方法二
         *
         * **/
  
        // const vectorSource = new VectorSource();
        // const vectorLayer = new VectorLayer({
        //   source: vectorSource
        // });
        // this.map.addLayer(vectorLayer);
  
        // const marker = new Feature({
        //   name: "点位",
        //   id: 1,
        //   geometry: new Point(fromLonLat([116.411794, 39.9068]))
        // });
        // vectorSource.addFeature(marker);
  
        // console.log();
  
        // marker.setStyle(
        //   new Style({
        //     image: new Circle({
        //       radius: 6,
        //       fill: new Fill({ color: "red" }),
        //       stroke: new Stroke({
        //         color: "green",
        //         width: 3
        //       })
        //     })
        //   })
        // );
  
        /**
         * 点击标记事件
         *
         * **/
  
        // this.map.on("singleclick", e => {
        //   console.log(e);
  
        //   let point = this.map.forEachFeatureAtPixel(e.pixel, feature => feature);
        //   //如果没有点击到标记 这里会打印出undefined
        //   console.log(point);
  
        //   if (point) {
        //     let params = point.getProperties();
        //     console.log("当前标点参数", params);
  
        //     let point4326 = transform(
        //       params.geometry.flatCoordinates,
        //       "EPSG:3857",
        //       "EPSG:4326"
        //     );
        //     console.log(point4326);
        //   }
        // });
      },
  
      /* 显示图层 */
      show_PointLayer() {
        this.overlay.getElement().style.display = "block";
        this.map.addLayer(this.PointLayer);
      },
  
      /* 隐藏图层 */
      hide_PointLayer() {
        this.overlay.getElement().style.display = "none";
        this.map.removeLayer(this.PointLayer);
      },
  
      /* 创建矢量图层保存多边形 */
      drawPolygon() {
        this.map.removeLayer(this.layer_polygon);
        console.log(this.Polygon_info);
  
        let arr = [];
        this.Polygon_info.forEach(item => {
          arr.push(new Feature(new Polygon(item))); // 多边形
          console.log(item);
        });
  
        console.log(arr);
        this.layer_polygon = new VectorLayer({
          source: new VectorSource({
            features: arr
          }),
          style: new Style({
            stroke: new Stroke({
              color: "green",
              width: 2
            })
          }),
          zIndex: 999
        });
        this.map.addLayer(this.layer_polygon);
      },
  
      /* 创建矢量图层保存圆也是矩形 */
      drawCircle() {
        // this.map.removeLayer(this.layer_circle);
        console.log(this.Circle_info);
        let arr = [];
        this.Circle_info.forEach(item => {
          arr.push(new Feature(new Polygon(item))); // 圆 矩形
        });
  
        console.log(arr);
  
        this.layer_circle = new VectorLayer({
          source: new VectorSource({
            features: arr
          }),
          style: new Style({
            stroke: new Stroke({
              color: "green",
              width: 2
            })
          })
        });
        this.map.addLayer(this.layer_circle);
      },
  
      /* 创建矢量图层保存线  在地图上画线后 添加到图层上 */
      drawLine() {
        this.map.removeLayer(this.layer_line);
        this.tooltip_overlay_line = [];
        let arr = [];
  
        console.log(this.line_info);
  
        this.line_info.forEach((item, index) => {
          console.log(item);
  
          arr.push(new Feature(new LineString(item))); // 线
  
          /* 创建div元素 用于显示提示信息（在循环里创建 当用户画出一条线的时候创建一个div ， 当画出n个线的时候 创建n个div） */
          const tooltip = document.createElement("div");
  
          const gismap = document.getElementById("gismap"); // 获取父元素的dom
  
          tooltip.id = "draw_Tooltip_line_" + index;
  
          // tooltip.style.position = "absolute";
          tooltip.style.backgroundColor = "#0000003b";
          tooltip.style.borderRadius = "10px";
          tooltip.style.padding = "5px 10px";
          tooltip.style.color = "#fff";
          tooltip.innerHTML = this.tooltip_text;
  
          // 将提示框添加到地图容器中
          gismap.appendChild(tooltip);
  
          // 创建覆盖物（同理 创建n个覆盖物每个覆盖物绑定一个div）
          this.tooltip_overlay_line.push(
            new Overlay({
              position: item[0], // 覆盖物的位置 此时的item[0]是线起点坐标 item[1]是线终点坐标
              positioning: "bottom-center",
              element: document.getElementById("draw_Tooltip_line_" + index),
              stopEvent: false,
              autoPan: true, // 是否自动平移，当点击时对话框超出屏幕边距，会自动平移地图使其可见
              autoPanMargin: 20, // 设置自动平移边距
              offset: [0, -25], // 覆盖层偏移起点的位置
              className: "tooltip_content_" + index // 覆盖物在覆盖层的类名
              // offset:[200,100]
            })
          );
          console.log(this.tooltip_overlay_line);
  
          this.map.addOverlay(this.tooltip_overlay_line[index]); // 把创建的每一个覆盖物添加到地图上
        });
  
        console.log(arr);
  
        this.layer_line = new VectorLayer({
          source: new VectorSource({
            features: arr
          }),
          style: new Style({
            stroke: new Stroke({
              color: "green",
              width: 2
            })
          }),
          zIndex: 999
        });
        this.map.addLayer(this.layer_line);
      },
  
      /* 当选择下拉菜单时触发 在地图上绘制点、线、多边形等  并进行测量面积和距离 */
      draw_event() {
        this.map.removeOverlay(this.tooltip_overlay);
  
        if (this.draw !== null) {
          this.map.removeInteraction(this.draw);
        }
        // https://blog.csdn.net/qq_53079432/article/details/133940252 创建 方形 矩形 圆
        let geometryFunction = null;
        if (this.select !== "None") {
          if (this.select == "Circle") {
            geometryFunction = createBox(); // 使用createBox函数创建矩形
          }
  
          this.draw = new Draw({
            source: new VectorTile({}),
  
            // geometryFunction, // 使用createBox函数创建矩形
            // geometryFunction:createRegularPolygon(4), // 方形
            type: this.select,
            // geometryFunction: Draw.createBox(),
            style: new Style({
              stroke: new Stroke({
                color: "green",
                width: 2
              })
            })
          });
        } else {
          /* 选择重置时触发 */
          this.draw = null;
          this.map.removeOverlay(this.tooltip_overlay);
          console.log("清除");
          this.line_info = [];
          this.map.removeLayer(this.layer_line);
          this.map.removeLayer(this.layer_polygon);
          console.log(this.tooltip_overlay_line);
          this.tooltip_overlay_line.forEach(item => {
            this.map.removeOverlay(item);
          });
          this.tooltip_overlay_line = [];
        }
        /* 监听绘制开始事件 */
        this.draw.on("drawstart", evt => {
          /* 在这里可以添加提示文字的逻辑，比如创建一个提示框并显示在地图上 */
          const tooltip = document.createElement("div");
          tooltip.className = "drawTooltip";
          tooltip.style.position = "absolute";
          tooltip.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
          tooltip.style.border = "1px solid #ccc";
          tooltip.style.padding = "4px 8px";
          tooltip.style.fontSize = "14px";
          /* 将提示框添加到地图容器中 */
          this.map.getViewport().appendChild(tooltip);
  
          // 监听鼠标移动事件，更新提示文字的位置
          this.map.on("pointermove", evt => {
            const pixel = this.map.getPixelFromCoordinate(evt.coordinate);
            tooltip.style.left = pixel[0] + "px";
            tooltip.style.top = pixel[1] + "px";
            tooltip.innerHTML = "开始绘制线段，请点击确定位置";
          });
        });
  
        // 监听绘制结束事件
        this.draw.on("drawend", evt => {
          const tooltips = document.getElementsByClassName("drawTooltip");
          console.log(tooltips);
          for (let i = 0; i < tooltips.length; i++) {
            // tooltips[i].parentNode.removeChild(tooltips[i]);
            tooltips[i].remove();
          }
  
          if (this.select == "LineString") {
            // 判断为线时
            console.log(evt.target.sketchCoords_);
            const line = evt.feature.getGeometry();
            console.log(line);
            console.log(line.__ob__.value);
            const length = getLength(line);
            console.log("测量的距离为:", length, "米");
  
            this.tooltip_text = `${length.toFixed(2)}米`;
  
            this.tooltip_overlay.setPosition([
              evt.target.sketchCoords_[evt.target.sketchCoords_.length - 1][0],
              evt.target.sketchCoords_[evt.target.sketchCoords_.length - 1][1]
            ]);
  
            this.line_temporaryinfo = evt.target.sketchCoords_;
  
            // 将覆盖物添加到地图上
            this.map.addOverlay(this.tooltip_overlay);
          } else if (this.select == "Polygon") {
            // 判断为多边形时
            console.log(evt);
            const polygon = evt.feature.getGeometry();
            const area = getArea(polygon);
            const areaInSquareMeters = area;
  
            console.log("测量的面积为:", areaInSquareMeters, "平方米");
  
            this.tooltip_text = `${areaInSquareMeters.toFixed(2)}平方米`;
            this.tooltip_overlay.setPosition([
              evt.target.sketchCoords_[0][
                evt.target.sketchCoords_[0].length - 1
              ][0],
              evt.target.sketchCoords_[0][
                evt.target.sketchCoords_[0].length - 1
              ][1]
            ]);
  
            this.Polygon_temporaryinfo = evt.target.sketchCoords_;
            console.log(this.line_temporaryinfo);
  
            // 将覆盖物添加到地图上
            this.map.addOverlay(this.tooltip_overlay);
          } else if (this.select == "Circle") {
            // 判断为圆时 （圆可以是矩形，可以是正方形，可以是六芒星）通过上方属性改变
            console.log(evt);
  
            // const polygon = evt.feature.getGeometry();
            // const area = getArea(polygon);
            // const areaInSquareMeters = area;
  
            // console.log("测量的面积为:", areaInSquareMeters, "平方米");
  
            // this.tooltip_text = `${areaInSquareMeters.toFixed(2)}平方米`;
  
            console.log(evt.target.sketchCoords_);
  
            this.tooltip_overlay.setPosition([
              evt.target.sketchCoords_[evt.target.sketchCoords_[0].length - 1][0],
              evt.target.sketchCoords_[evt.target.sketchCoords_[0].length - 1][1]
            ]);
  
            this.Circle_temporaryinfo = evt.target.sketchCoords_;
  
            console.log(this.Circle_temporaryinfo);
  
            // 将覆盖物添加到地图上
            this.map.addOverlay(this.tooltip_overlay);
          }
        });
        this.map.addInteraction(this.draw);
      },
  
      /* 创建覆盖物 弹出框 用于显示 tooltip （测量工具提示框） */
      Tooltip() {
        this.tooltip_overlay = new Overlay({
          // position: fromLonLat([104.043505, 30.58165]),
          positioning: "bottom-center",
          element: document.getElementById("tooltip_overlay_1"),
          stopEvent: false,
          autoPan: true, // 是否自动平移，当点击时对话框超出屏幕边距，会自动平移地图使其可见
          autoPanMargin: 20, // 设置自动平移边距
          offset: [0, -25], // 覆盖层偏移起点的位置
          className: "tooltip_content" // 覆盖物在覆盖层的类名
          // offset:[200,100]
        });
      },
  
      /* 地图上实现 覆盖物1(用于展示点位上方的覆盖物弹框) */
      marker() {
        // 创建覆盖物
        this.overlay = new Overlay({
          // position: fromLonLat([104.043505, 30.58165]),
          positioning: "bottom-center",
          element: document.getElementById("marker"),
          stopEvent: false,
          autoPan: true, // 是否自动平移，当点击时对话框超出屏幕边距，会自动平移地图使其可见
          autoPanMargin: 20, // 设置自动平移边距
          offset: [0, -25], // 覆盖层偏移起点的位置
          className: "overlay-test" // 覆盖物在覆盖层的类名
          // offset:[200,100]
        });
        // this.map.addOverlay(marker);
  
        /*
          实现点击标注后在对应位置弹出信息框， 拿到标注的 feature 除了设置经纬度外，
          还能通过其 id 向后台接口获取要展示的数据，再渲染到覆盖层的对话框上，这里代码给的比较简要，
          有需要的可根据具体业务结合这个思路自行扩充代码
        */
        var content = document.getElementById("content");
        this.map.on("singleclick", e => {
          // 获取点击的标注
          let features = this.map.forEachFeatureAtPixel(
            e.pixel,
            feature => feature
          );
          console.log(features);
          console.log(this.overlay);
  
          if (features.values_.id) {
            // 设置覆盖物的经纬度
            this.overlay.setPosition([
              features.values_.geometry.flatCoordinates[0],
              features.values_.geometry.flatCoordinates[1]
            ]);
  
            // 设置要显示的信息
  
            this.point_text = `当前坐标为${transform(
              features.values_.geometry.flatCoordinates,
              "EPSG:3857",
              "EPSG:4326"
            )[0].toFixed(2)} : ${transform(
              features.values_.geometry.flatCoordinates,
              "EPSG:3857",
              "EPSG:4326"
            )[1].toFixed(2)}`;
            // this.point_text = `当前坐标为${features.values_.geometry.flatCoordinates[0].toFixed(2)}:${features.values_.geometry.flatCoordinates[1].toFixed(2)}`;
            // 将覆盖物添加到地图上
            this.map.addOverlay(this.overlay);
          }
        });
      },
  
      /* 地图上实现 覆盖物2 */
      cover_dom() {
        this.overlay_two = new Overlay({
          position: fromLonLat([104.043505, 30.58165]),
          positioning: "bottom-center",
          element: document.getElementById("overlay_two"),
          stopEvent: false,
          autoPan: true, // 是否自动平移，当点击时对话框超出屏幕边距，会自动平移地图使其可见
          autoPanMargin: 20, // 设置自动平移边距
          offset: [10, -10], // 覆盖层偏移起点的位置
          className: "overlay_two" // 覆盖物在覆盖层的类名
          // offset:[200,100]
        });
  
        this.map.addOverlay(this.overlay_two);
        console.log(this.overlay_two);
  
        // this.overlay_two.getElement.style.display = 'null'
      },
  
      /* 地图上显示 覆盖物2 */
      show_overlay_two() {
        this.overlay_two.getElement().style.display = "block";
      },
  
      /* 地图上隐藏 覆盖物2 */
      hide_overlay_two() {
        this.overlay_two.getElement().style.display = "none";
      },
  
      /* 地图上添加注记 */
      add_annotation() {
        let url =
          "http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=92843da163a04bbb9b51511319d78c9a";
        const sourceCVA = new XYZ({
          url: url,
          format: new Text()
        });
        const tdtcvaLayer = new TileLayer({
          source: sourceCVA
          // projection: "EPSG:3857"
        });
        this.map.addLayer(tdtcvaLayer);
  
        // console.log(this.lineData);
        console.log(jsonData);
      },
  
      /* 回到中心点事件 */
      center_point() {
        // log(this.map.getView().getCenter());
        console.log(this.map.getView().getCenter());
        console.log(this.map.getView().getZoom());
  
        // this.map.getView().setCenter(this.map.getView().getCenter());
        // this.map.getView().setZoom(this.map.getView().getZoom());
  
        this.map.getView().animate({
          center: fromLonLat([117.190182, 39.435596]),
          zoom: 9,
          duration: 2000
        });
      },
  
      /* 打开卫星图层 */
      open_satelliteLayer() {
        this.satelliteLayer = new TileLayer({
          source: new XYZ({
            url:
              "http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=92843da163a04bbb9b51511319d78c9a"
          })
        });
  
        //卷帘功能
        this.satelliteLayer.on("prerender", event => {
          // console.log(event);
  
          const ctx = event.context;
          const mapSize = this.map.getSize();
          console.log(mapSize);
  
          const width = mapSize[0] * (this.swipeVal / 100);
          const tl = getRenderPixel(event, [width, 0]);
          const tr = getRenderPixel(event, [mapSize[0], 0]);
          const bl = getRenderPixel(event, [width, mapSize[1]]);
          const br = getRenderPixel(event, mapSize);
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(tl[0], tl[1]);
          ctx.lineTo(bl[0], bl[1]);
          ctx.lineTo(br[0], br[1]);
          ctx.lineTo(tr[0], tr[1]);
          ctx.closePath();
          ctx.clip();
        });
  
        this.satelliteLayer.on("postrender", function(event) {
          console.log(event);
  
          const ctx = event.context;
          ctx.restore();
        });
  
        this.map.addLayer(this.satelliteLayer);
      },
  
      /* 关闭卫星图层 */
      closed_satelliteLayer() {
        this.map.removeLayer(this.satelliteLayer);
        this.satelliteLayer = null;
      },
  
      /* 滑块滑动事件 */
      formatTooltip(val) {
        console.log(val);
        console.log(this.swipeVal);
        this.map.render();
        console.log(this.map);
  
        return val / 100;
      }
    }
  };
  </script>
  <style lang="scss" scoped>
  #gismap {
    position: relative;
  }
  .top-btn {
    position: absolute;
    top: 10px;
    left: 50%;
    z-index: 9999;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
  }
  #marker {
    padding-top: 23px;
    padding-bottom: 25px;
    padding-left: 15px;
    padding-right: 19px;
    box-sizing: border-box;
    border-radius: 15px;
    /* position: relative; */
    width: 140px;
    height: 95px;
    /* background-color: rgba(121, 208, 235, 0.5); */
    /* border: 1px solid rgba(121, 208, 235, 1); */
    /* background-color: rgba(255, 255, 255, 0.7); */
    background-image: url(https://i.postimg.cc/65DZsLq4/0c90af1c496bef210cad24a77e1f078f6a6e4eacfe36-TIIc1-F-fw240webp.webp);
    background-size: 100% 100%;
    text-align: center;
    background-repeat: no-repeat;
  }
  .arrow {
    /* border-bottom: 12px solid transparent;
    border-left: 12px solid transparent;
    border-top: 12px solid rgba(121, 208, 235, 1);
    border-right: 12px solid transparent;
  
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%); */
  }
  #tooltip_overlay_1 {
    background-color: #0000003b;
    padding: 5px 10px;
    box-sizing: border-box;
    border-radius: 10px;
    color: #fff;
  }
  </style>
  