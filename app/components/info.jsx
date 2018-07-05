var React = require("react");
var ReactDOM = require("react-dom");

module.exports = React.createClass({

    render:function(){
        // let boundClick = this.clickHandler.bind(this, this.props.info);
        return(
       
        <div className="row">
          <div data-view="list-view" className="download-cards" >
            <article className="download-card">
              <div className="download-card__icon-box"><img className="image_title" src={this.props.info.image} /></div>
              <div className="download-card__content-box">
                <div className="content">
                  <h3 className="download-card__content-box__title">{this.props.info.name}</h3>
                    <hr></hr>
                    <div className="row">
                    <div className="col-md-4 col-xs-3 col-sm-4 left-label"><label>Capacity</label></div>
                     <div className="col-md-8 col-xs-9 col-sm-8 custom_classes">:  &nbsp;&nbsp;{this.props.info.capacity}</div>
                    </div>
                    <div className="row">
                    <div className="col-md-4 col-xs-3 col-sm-4 left-label"><label>Workspace Type</label></div>
                     <div className="col-md-8 col-xs-9 col-sm-8 custom_classes">: &nbsp;&nbsp;{this.props.info.type}</div>
                    </div>
                    <div className="row">
                    <div className="col-md-4 col-xs-3 col-sm-4 left-label"><label>Availability</label></div>
                     <div className="col-md-8 col-xs-9 col-sm-8 custom_classes">: &nbsp;&nbsp;{this.props.info.feasability}</div>
                    </div>
                    <br></br>
                <a className="button" id="product-list" 
                    onClick={this.props.clickEvent}> <i className="fa fa-cloud-download"></i> Click here to know more...</a>

              </div>
              </div>
            </article>    
            </div> 
            </div>
        )
    }
});












