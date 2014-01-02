'use strict';

angular.module('seoToolApp')
.controller('MainCtrl', function ($scope,$sce) {
	$scope.inputHtml=''//$sce.trustAsHtml( '<textarea class="col-md-12" ></textarea>' );
	$scope.aTags=[]
	$scope.imgTags=[]
	$scope.metaTags=[]
	$scope.tmpCounter=0;
	$scope.output=''

	var $$=window.cheerio

	var htmlContent=''

	var tagNameToAttributes={
		'img':['src','alt'],
		'a':['href','title'],
		'meta':['content','name']
	}

	$scope.processHtml=function(inputHtml){
		var workspace=$('#workspace')

		//workspace.append( $(inputHtml) );
		htmlContent=$.parseHTML(inputHtml)
		htmlContent=$('<div>').append(inputHtml)

		Object.keys(tagNameToAttributes).forEach(function(tagName){
			$scope[tagName+'Tags']=[]
			_getTags(tagName)
		})

		// TODO: if meta tag not contains eywords, description, etc. add them
		$scope.getOutput()
	}

	function _getTags(tagName){
		var attributes
		, tmpTags=[]
		, workspace=htmlContent;

		
		attributes=tagNameToAttributes[tagName]

		var elements;
		if (tagName=='meta'){
			elements=$(workspace).filter('meta')
		}else{
			elements=$(tagName,workspace)
		}

		elements.each(function(){
			var id=$scope.tmpCounter
			, $el=$(this);
			$scope.tmpCounter++;
			
			$el.attr('seo-tool-id',id);
			var tag={id:id}
			attributes.forEach(function(attrName){
				tag[attrName]=$el.attr(attrName)
			})
			tmpTags.push(tag)
		})
		console.log(tagName+'Tags',tmpTags.length);
		$scope[tagName+'Tags']=tmpTags
	}
	

	$scope.getOutput=function(){
		var workspace=htmlContent
		, output;
		$('a,img',workspace).each(function(){
			$(this).removeAttr('seo-tool-id');
		})
		var a=$('<div>').append(workspace);
		console.log('$(workspace)',a.html());
		output=HtmlEscaper.escape( a.html() )
		//console.log('workspace',workspace);
		//console.log('workspace.html()',$(workspace).html());
		//console.log('www',output);
		//$scope.output=output
		$('#workspace').html(output);
		
	}


	var HtmlEscaper={
		entityMap : {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': '&quot;',
			"'": '&#39;',
			"/": '&#x2F;'
		},
		escape:function escapeHtml(string) {
			return String(string).replace(/[&<>"'\/]/g, function (s) {
				return HtmlEscaper.entityMap[s];
			});
		}
	}
	

})
