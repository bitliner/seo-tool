'use strict';

angular.module('seoToolApp')
.controller('MainCtrl', function ($scope,$sce) {
	$scope.inputHtml=''//$sce.trustAsHtml( '<textarea class="col-md-12" ></textarea>' );
	$scope.aTags=[]
	$scope.imgTags=[]
	$scope.metaTags=[]
	$scope.tmpCounter=0;
	$scope.output=''

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

		Object.keys(tagNameToAttributes).forEach(function(tagName){
			$scope[tagName+'Tags']=[]
			_getTags(tagName)
		})
		
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
	$scope.save=function(aTag,attr){
		var workspace=htmlContent
		$( '#'+aTag.id, workspace).attr(attr,aTag.title)
	}

	$scope.getOutput=function(){
		var workspace=htmlContent
		$('a,img',workspace).each(function(){
			$(this).removeAttr('seo-tool-id');
		})
		alert( workspace.html() );
	}

	

})
