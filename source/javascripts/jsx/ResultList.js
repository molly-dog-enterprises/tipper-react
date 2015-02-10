$(function() {
  var Result = React.createClass({
    render: function () {
      return (
        <div className="result">
          {this.props.homeTeam} v {this.props.awayTeam}
          <div className="score">{this.props.score}</div>
        </div>
        );
    }
  });

  var ResultList = React.createClass({
    getInitialState: function() {
      return {data: []};
    },
    render: function () {
      var resultList = this.props.data.map(function (result) {
        return (
          <Result homeTeam={result.homeTeam} awayTeam={result.awayTeam} score={result.score} />
        )
      });

      return (
        <div className="resultList">
          {resultList}
        </div>
        );
    }
  });

  var Results = React.createClass({
    getInitialState: function() {
      return { data: [] };
    },
    componentDidMount: function() {
      this.setDataState = function(data) {
        this.setState({data: data})
      };
      $.ajax({
        url: this.props.url,
        dataType: 'jsonp',
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    render: function () {

      return (
        <div className="results">
          <ResultList data={this.state.data} />
        </div>
        );
    }
  });

  React.render(
    <Results url="http://localhost:3000/results.json" />,
    document.getElementById('content')
  );
});
