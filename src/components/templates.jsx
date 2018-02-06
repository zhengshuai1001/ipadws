import { Link, hashHistory } from "react-router";

export const TableHead = (props) => (     
    <div className="tableHead">
        <div className="leftLogoWord fn-left"><i className="iconfont icon-jiantou"></i>返回</div>
        <img src={props.url} className="fn-right" />
    </div>
)
export const getLocationParam = (name) => {
    var url = window.location.search;
    if (~url.indexOf("?")) {
        var search = {};
        var arrayParam = url.split("?")[1].split("&");
        arrayParam.map(function (value, index, elem) {
            var key = value.split("=")[0];
            var val = value.split("=")[1];
            search[key] = val;
        });
        if (name in search) {
            return search[name];
        } else {
            return "";
        }
    }
    return "";
}
export const TableHeads = (props) => (     
    <div className="tableHead">
        <div className="leftLogoWord fn-left" onClick={()=>{hashHistory.goBack()}}><i className="iconfont icon-jiantou"></i>返回</div>
        {
            props.isHide ? "" : props.tag
        }
        <img src={props.url} className="fn-right" />
    </div>
)
export const Customs = (props) =>(         //我的客户信息展示
    <ul className="customDetails">
        {
            props.dataList.map(function(value){
                return <li>
                    <div className="liWrap">
                        <div className="left fn-left">
                            <img src='' />
                        </div>
                        <div className="mid fn-left">
                            <h3>
                                <Link to={'/company?tab=0&id='+value.id}>{value.company}<span>{value.tag}</span></Link>
                            </h3>
                            <table>
                                <tr>
                                    <td style={{ width: "60px", position: "relative" }}>
                                        <span style={{
                                            float: "left",
                                            position: "absolute",
                                            left: "0",
                                            top: "0",
                                            lineHeight: "18px"
                                        }}>服务内容:</span>
                                    </td>
                                    <td style={{ lineHeight: "18px" }}>
                                        <p>{value.content}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <table>
                                            <tr>
                                                <td style={{ width: "35px", position: "relative" }}>
                                                    <span style={{ 
                                                        float: "left", 
                                                        position: "absolute", 
                                                        left: "0", 
                                                        top: "0", 
                                                        lineHeight: "18px" 
                                                    }}>备注:</span>
                                                </td>
                                                <td style={{
                                                    lineHeight: "18px"
                                                }}><p>{value.remark}</p></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <table>
                                            <tr>
                                                <td style={{ width: "35px", position: "relative" }}>
                                                    <span style={{ float: "left", position: "absolute", left: "0", top: "0", lineHeight: "18px" }}>条件:</span>
                                                </td>
                                                <td style={{ lineHeight: "18px" }}><p>{value.resean}</p></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div className="right fn-right">
                            <p className="more"><i>...</i></p>
                            <ul>
                                <li>
                                    <p className="top"><Link to="/visitRecord?tab=1">{value.duty}</Link></p>
                                    <p className="btm">任务</p>
                                </li>
                                <li>
                                    <p className="top"><Link to="/visitRecord?tab=1">{value.visit}</Link></p>
                                    <p className="btm">回访</p>
                                </li>
                                <li>
                                    <p className="top"><Link to="/visitRecord?tab=1">{value.summary}</Link></p>
                                    <p className="btm">纪要</p>
                                </li>
                                <li>
                                    <p className="top"><Link to="/visitRecord?tab=1">{value.validate}</Link></p>
                                    <p className="btm">验收</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="line"></div>
                    <div className="person">
                        <p>相关人员 : {
                            value.relate.map(function(value){
                                return <span>{value}<i className="iconfont icon-shanchu" onClick={(e) => { props.del(e) }}></i></span>
                            })
                        }
                            <a style={{ marginLeft: "0.5rem" }} href="javascript:;">全部</a>
                            <a href="javascript:;" onClick={(e) => { props.showModal(e,value.id)}}>新增</a>
                        </p>
                    </div>
                </li>
            })
        }
    </ul>
)
export const div2png =(dom, name) => {         //html转图片
    html2canvas(dom, {
        onrendered: function (canvas) {
            canvas.id = "mycanvas";
            document.body.appendChild(canvas);
            var newCanvas = document.getElementById("mycanvas");
            var type = "png";
            var imgData = newCanvas.toDataURL(type);
            var _fixType = function (type) {
                type = type.toLowerCase().replace(/jpg/i, 'jpeg');
                var r = type.match(/png|jpeg|bmp|gif/)[0];
                return 'image/' + r;
            };

            imgData = imgData.replace(_fixType(type), 'image/octet-stream');
            var saveFile = function (data, filename) {
                var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
                save_link.href = data;
                save_link.download = filename;

                var event = document.createEvent('MouseEvents');
                event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                save_link.dispatchEvent(event);
            };
            // 下载后的问题名
            var filename = name + '_' + (new Date()).getTime() + '.' + type;
            // download
            saveFile(imgData, filename);
            //   $("#mycanvas").remove();
            newCanvas.remove();
        },
        useCORS: true
    });
}
export const readyDo = () => {
    let downloadPng = document.getElementById("downloadPng");
    let fromHTMLtestdiv = document.getElementById("fromHTMLtestdiv");
    let download = document.getElementById("download");
    downloadPng.onclick = function () {
        div2png(fromHTMLtestdiv, 'png')
    }
    download.onclick = function () {
        html2canvas(fromHTMLtestdiv, {
            onrendered: function (canvas) {
                var imgData = canvas.toDataURL('image/png');
                var imgWidth = 210;
                var pageHeight = 295;
                var imgHeight = canvas.height * imgWidth / canvas.width;
                var heightLeft = imgHeight;

                var doc = new jsPDF('p', 'mm');
                var position = 0;

                doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    doc.addPage();
                    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }
                doc.save('sample-file.pdf');
            },
            useCORS: true
        });
    };
}


export const init = (textarea) => {
    var observe;
    if (window.attachEvent) {
        observe = function (element, event, handler) {
            element.attachEvent('on' + event, handler);
        };
    }
    else {
        observe = function (element, event, handler) {
            element.addEventListener(event, handler, false);
        };
    }
    var text = document.getElementById(textarea);
    function resize() {
        text.style.height = 'auto';
        var vHeight = text.scrollHeight - 3;
        text.style.height = vHeight + 'px';
    }
    function delayedResize() {
        window.setTimeout(resize, 0);
    }
    observe(text, 'change', resize);
    observe(text, 'cut', delayedResize);
    observe(text, 'paste', delayedResize);
    observe(text, 'drop', delayedResize);
    observe(text, 'keydown', delayedResize);
    text.focus();
    text.select();
    resize();
}