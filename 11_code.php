<?
if ($properties["back_color"] == "")
	$properties["back_color"] = "transparent";
else
	$properties["back_color"] = "#".str_replace("#", "", $properties["back_color"]);

if ($properties["text_color"] == "")
	$properties["text_color"] = "#333333";
else
	$properties["text_color"] = "#".str_replace("#", "", $properties["text_color"]);
?>
<div class="code"<?if (is_file($_SERVER["DOCUMENT_ROOT"]."/images/data/".$fields["back"])) {?> style="background-image: url('/images/data/<?=$fields["back"];?>);"<?}?>>
	<div class="code_">
<?
print $fields["code"];
?>
	</div>
</div>