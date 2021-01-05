<?php
	
	$database = require '..\bootstrap.php';
	session_start();
	// setting return value
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	$data = json_decode(file_get_contents("php://input"), true);

	printSalesSummary($data['nMonth'], $data['tData']);


	function printSalesSummary($nMonth, $tData){

		$dateStr = date_format(date_create($data["date_added"]),"F d, Y");

		require("../lib/fpdf/fpdf.php");

		$f = new NumberFormatter("en", NumberFormatter::SPELLOUT);

		class PDF extends FPDF
		{

			//Cell with horizontal scaling if text is too wide
		    function CellFit($w, $h=0, $txt='', $border=0, $ln=0, $align='', $fill=false, $link='', $scale=false, $force=true)
		    {
		        //Get string width
		        $str_width=$this->GetStringWidth($txt);

		        //Calculate ratio to fit cell
		        if($w==0)
		            $w = $this->w-$this->rMargin-$this->x;
		        $ratio = ($w-$this->cMargin*2)/$str_width;

		        $fit = ($ratio < 1 || ($ratio > 1 && $force));
		        if ($fit)
		        {
		            if ($scale)
		            {
		                //Calculate horizontal scaling
		                $horiz_scale=$ratio*100.0;
		                //Set horizontal scaling
		                $this->_out(sprintf('BT %.2F Tz ET',$horiz_scale));
		            }
		            else
		            {
		                //Calculate character spacing in points
		                $char_space=($w-$this->cMargin*2-$str_width)/max($this->MBGetStringLength($txt)-1,1)*$this->k;
		                //Set character spacing
		                $this->_out(sprintf('BT %.2F Tc ET',$char_space));
		            }
		            //Override user alignment (since text will fill up cell)
		            $align='';
		        }

		        //Pass on to Cell method
		        $this->Cell($w,$h,$txt,$border,$ln,$align,$fill,$link);

		        //Reset character spacing/horizontal scaling
		        if ($fit)
		            $this->_out('BT '.($scale ? '100 Tz' : '0 Tc').' ET');
		    }

		    //Cell with horizontal scaling only if necessary
		    function CellFitScale($w, $h=0, $txt='', $border=0, $ln=0, $align='', $fill=false, $link='')
		    {
		        $this->CellFit($w,$h,$txt,$border,$ln,$align,$fill,$link,true,false);
		    }

			// Page header
			function Header()
			{
			    // Logo
			    //$ampongDentalLogo = "images/ad_horizontal.jpg";
			    //$this->Image($ampongDentalLogo,90,6,40);
			    // Arial bold 15
			    if (!$this->skipHeader) {
			            // ...
			        
				    $this->SetFont('Arial','B',15);
				    // Move to the right
				    $this->Cell(80);
				    // Title
				    $this->Cell(30,10,'AMPONG DENTAL CLINIC',0,0,'C');
				    // Line break
				    $this->Ln(20);
			    }
			}

			// Page footer
			function Footer()
			{
				if (!$this->skipFooter) {
				    // Position at 1.5 cm from bottom
				    $this->SetY(-15);
				    // Arial italic 8
				    $this->SetFont('Arial','I',8);
				    // Page number
				    $this->Cell(0,10,'Page '.$this->PageNo().'/{nb}',0,0,'C');
				}
			}
		}

		// Instanciation of inherited class
		$pdf = new PDF("L", "mm", array(210 , 297 ));
		$pdf->AliasNbPages();
		$pdf->skipHeader = true;
		$pdf->AddPage();
		$pdf->SetFont('Times','',10);

		$yAxis = 13;
		$xAxis = 75;
		$coveredWidth = 147;
		$pdf->SetY($yAxis);
		$pdf->SetX($xAxis);
		$pdf->SetFont('Times','B',12);
		$pdf->Cell($coveredWidth,3,"AMPONG DENTAL CLINIC",0, 2, 'C');
		$pdf->SetFont('Times','',8);
		$pdf->Cell($coveredWidth,3,"2F Kamuning Place, Kamuning Road,",0, 2, 'C');
		$pdf->Cell($coveredWidth,3,"Quezon City, Philippines",0, 2, 'C');
		$pdf->Cell($coveredWidth,3,"Phone: (02) 8281-5482",0, 2, 'C');
		$pdf->Cell($coveredWidth,3,"Cellphone: (63) 9178835013",0, 2, 'C');


		$yAxis = $yAxis+20;
		$pdf->SetY($yAxis);
		$pdf->SetX($xAxis);

		$col1 = 27;
		$col2 = 60;
		$col3 = 60;

		$pdf->SetY($yAxis);
		$pdf->SetX($xAxis);
		$pdf->SetFillColor(211,211,211);
		$pdf->CellFitScale($col1,14,"",1, 0, 'C', true);
		$pdf->CellFitScale($col2,14,"",1, 0, 'C', true);
		$pdf->CellFitScale($col3,14," ",1, 0, 'C', true);
		$pdf->SetFillColor(0,0,0);

		$yAxis = $yAxis+2;
		$pdf->SetY($yAxis);
		$pdf->SetX($xAxis);
		$pdf->SetFont('Times','B',10);
		$pdf->CellFitScale($col1,12,"#",0, 0, 'C');
		$pdf->CellFitScale($col2,12,"Month",0, 0, 'C');
		$pdf->CellFitScale($col3,12,"Sales",0, 0, 'C');

		$yAxis = $yAxis+5;
		$pdf->SetY($yAxis);
		$pdf->SetX($xAxis);
		$pdf->CellFitScale($col1,7,"",0, 0, 'C');
		$pdf->CellFitScale($col2,7,"",0, 0, 'C');
		$pdf->CellFitScale($col3,7,"",0, 0, 'C');


		$pCtr = 0;
		$dLength = count($nMonth);

		$yAxisBeforeBox = $yAxis;
		
		$pdf->SetFont('Arial','',8);
		$modBreak = 17;
		$rowCnt = 1;
		$total = 0;

		for ($i=0; $i < $dLength; $i++) { 
			$yAxis = $yAxis+7;
			$pdf->SetY($yAxis);
			$pdf->SetX($xAxis);

			$pdf->CellFitScale($col1,7,$i+1,1, 0, 'C');
			$pdf->CellFitScale($col2,7,$nMonth[$i],1, 0, 'C');
			$pdf->CellFitScale($col3,7,"P".number_format($tData[$i]),1, 0, 'C');
			$total += $tData[$i];
			
			if($rowCnt == $modBreak) { 
				$pdf->AddPage();
				$yAxis = 13;
				$xAxis = 15;
				$modBreak = 23;
				$rowCnt = 1;
			}

			$rowCnt++;
			
			

		}

		$yAxis = $yAxis+7;
		$pdf->SetY($yAxis);
		$pdf->SetX($xAxis);
		$pdf->SetFont('Arial','B',8);
		$pdf->SetFillColor(230,230,230);
		$pdf->CellFitScale($col1,7,"","BTL", 0, 'C', true);
		$pdf->CellFitScale($col2,7,"TOTAL","BTR", 0, 'C', true);
		$pdf->CellFitScale($col3,7,"P".number_format($total),1, 0, 'C', true);

		$filename = "../pdf/salesSummaryTable.pdf";
		$pdf->Output($filename,'F');

	}

?>