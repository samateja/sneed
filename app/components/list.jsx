var React = require("react");
var ReactDOM = require("react-dom");
var SneedInfo = require("./info.jsx")
var Paginate  = require('react-paginate');

var URL = "http://localhost:80/getData";
var PER_PAGE = 5;

var Paginator = React.createClass({
    propTypes: {
        max: React.PropTypes.number.isRequired,
        maxVisible: React.PropTypes.number,
        onChange: React.PropTypes.func.isRequired
    },
    componentDidUpdate: function(prevProps, prevState) {
        if (prevState.currentPage !== this.state.currentPage) {
            this.props.onChange(this.state.currentPage);
        }
    },
    getDefaultProps: function() {
        return {
            maxVisible: 5
        };
    },
    getInitialState: function() {
        return {
            currentPage: 1,
            items: []
        };
    },
    goTo: function(page) {
        this.setState({currentPage: page});
    },

    onClickNext: function() {
        var page = this.state.currentPage;

        if (page < this.props.max) {
            this.goTo(page + 1);
        }
    },
    onClickPrev: function() {
        if (this.state.currentPage > 1) {
            this.goTo(this.state.currentPage - 1);
        }
    },
    render: function() {
        var className = this.props.className || '',
            p = this.props,
            s = this.state,
            skip = 0;

        if (s.currentPage > p.maxVisible - 1 && s.currentPage < p.max) {
            skip = s.currentPage - p.maxVisible + 1;
        } else if (s.currentPage === p.max) {
            skip = s.currentPage - p.maxVisible;
        }

        var iterator = Array.apply(null, Array(p.maxVisible)).map(function(v, i) {
            return skip + i + 1;
        });

        return (
            <nav>
                <ul className={'pagination ' + className}>
                    <li className={s.currentPage === 1 ? 'disabled' : ''}>
                        <a href="#" onClick={this.onClickPrev}>
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Prev</span>
                        </a>
                    </li>
                    {iterator.map(function(page) {
                        return (
                            <li key={page}
                                onClick={this.goTo.bind(this, page)}
                                className={s.currentPage === page ? 'active' : ''}>
                                <a href="#">{page}</a>
                            </li>
                        );
                    }, this)}
                    <li className={s.currentPage === p.max ? 'disabled' : ''}>
                        <a href="#" onClick={this.onClickNext}>
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
});

module.exports = React.createClass({
  componentDidMount: function() {
        this.onChangePage(1);
    },
    getData: function(page) {
        var data = [];
        return $.getJSON(URL, {
            results: PER_PAGE,
            start: PER_PAGE * (page - 1)
        }).then(function(result) {
            return result;
        });
    },
  getInitialState: function() {
        return {
            items: [],
            loading: true
        }
    },
    onChangePage: function(page) {
        this.getData(page).then(function(items) {
        var x;
        if (page == 1){
         x = items.slice(0,5); 
          console.log(x)
        }
        if(page == 2){
        	x = items.slice(-5);
        }
        this.setState({
                items: x,
                loading: false
            });
        }.bind(this));
    }, 
    renderItem: function(item) {
        return <li key={item.Id}>{item.name}</li>;
    },
   render:function(){
       var s = this.state;
       return(
        <div className="well sneed_background">
           <div className="row">
               <div className="col-md-3">
                   <div className="well">
                       <div> 
                           <h2> SNEED </h2> 
                            <hr className="sneed_line"></hr>
                       </div>
                    <p> We provide you with all that you need to build a better future. Booking a space has never been so easy. So go ahead and try our services at SNEED to explore a whole new world of opportunities.   </p>
                   </div>
               </div>
                <div className="col-md-8 sneed_left_box">
                    <Paginator max={3} onChange={this.onChangePage}/>
                    
                        {
                        s.loading ? <div>Loading...</div> :
                        s.items.map(function(s,index){
                            return(
                                <SneedInfo info={s} key={"names"+index} clickEvent={this.onListBoxClick.bind(this, s)} /> 
                            )         
                        }.bind(this))
                    }
                 
                </div>
               <div className="col-md-1">
               </div>
             </div>
           </div>
       )
   },
    onListBoxClick: function( row ) {
        
        ReactDOM.render( <ModalProductDetail row={row} />,document.getElementById('bootstrap-popup'));
		setTimeout( function() {
			$('#product-detail').modal("show");	
		});
	}

   
});




var ModalProductDetail = React.createClass({
	render: function() {
       
		return (

        <div className="modal fade" id="product-detail"  tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <aside className="product-card" >
                  <header>
                    <a target="_blank" href="#"><img src= {this.props.row.image} /></a>
                    <h2>{this.props.row.name}</h2>
                      <p>{this.props.row.description} </p>
                  </header>
                  <div className="product-bio">

                    <div className="row">
                    <div className="col-md-7 col-xs-3 col-sm-4"><label>Hourly Rates</label></div>
                     <div className="col-md-5 col-xs-9 col-sm-8 custom_classes">:&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;{this.props.row.price.hourly}</div>
                    </div>

                    <div className="row">
                     <div className="col-md-7 col-xs-3 col-sm-4"><label>Daily Rates:</label></div>
                     <div className="col-md-5 col-xs-9 col-sm-8 custom_classes">:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.row.price.daily}</div>
                   </div>

                    <div className="row">
                     <div className="col-md-7 col-xs-3 col-sm-4"><label>Monthly Rates</label></div>
                     <div className="col-md-5 col-xs-9 col-sm-8 custom_classes">:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.row.price.monthly}</div>
                    </div>
                      <div className="sampleContent">
                          <p>
                          We provide you with all that you need to build a better future. Booking a space has never been so easy. So go ahead and try our services at SNEED to explore a whole new world of opportunities.
                          </p>
                      </div>  
                     <div>
                         
                    <input type="button" className="button_avail" onClick={this.OnAvailClick.bind(this,this.props.row.Id)} id={this.props.row.Id} value={ (this.props.row.feasability == "available") ?  'Book now !!!' : 'Already Booked' }></input>
                      </div>
                  </div>
            </aside>
        </div> 
		)
	},
    OnAvailClick: function(data,event) {
        console.log(data)
        var val;
        console.log(event.target.value)
        if(event.target.value == 'Book now !!!'){
            val = 'Booked';
        }
        else{
            val = 'available';
        }
            
     $.ajax({
        type: 'POST',
        url: 'http://localhost:80/updateData',
        contentType: 'application/x-www-form-urlencoded',
        data: {"Id":data,"feasability":val}
      })
      .done(function(data) {
        console.log(data);
        $('#product-detail').modal("hide");
         window.location.reload();
      }.bind(this))
      .fail(function(jqXhr) {
        console.log('failed to register');
      });
      
    }
    
});


    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
