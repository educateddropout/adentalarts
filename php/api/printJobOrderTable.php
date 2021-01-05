<?php
	
	$database = require '..\bootstrap.php';
	session_start();
	// setting return value
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	$data = json_decode(file_get_contents("php://input"), true);

	printJobOrderTable($data['data'], $data['dateLabel']);


	function printJobOrderTable($data, $dateLabel){

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
		$xAxis = 15;
		$coveredWidth = 267;
		$pdf->SetY($yAxis);
		$pdf->SetX($xAxis);
		$pdf->SetFont('Times','B',12);
		$pdf->Cell($coveredWidth,3,"DENTAL ARTS DIGITAL LABORATORY",0, 2, 'C');
		$pdf->SetFont('Times','',8);
		$pdf->Cell($coveredWidth,3,"Unit 643, Winland Tower Residences 4",0, 2, 'C');
		$pdf->Cell($coveredWidth,3,"#45 Tomas Morato Avenue, Quezon City",0, 2, 'C');
		$pdf->Cell($coveredWidth,3,"Phone: (02) 8521-3683",0, 2, 'C');
		$pdf->Cell($coveredWidth,3,"Cellphone: (63) 917-138-5116",0, 2, 'C');

		$yAxis = 35;
		$pdf->SetY($yAxis);
		$pdf->SetX($xAxis);
		$pdf->SetFont('Times','',12);
		$pdf->Cell(30,4,"Date Covered:",0, 0, 'L');
		$pdf->Cell(60,4,$dateLabel,0, 0, 'L');

		$yAxis = $yAxis+6;

		$pdf->SetY($yAxis);
		$pdf->SetX($xAxis);
		$pdf->Cell(30,4,"Date Generated:",0, 0, 'L');
		$pdf->Cell(60,4,$dateStr,0, 0, 'L');

		$yAxis = $yAxis+8;
		$pdf->SetY($yAxis);
		$pdf->SetX($xAxis);

		$col1 = 7;
		$col2 = 30;
		$col3 = 40;
		$col4 = 45;
		$col5 = 20;
		$col6 = 40;
		$col7 = 20;
		$col8 = 35;
		$col9 = 15;
		$col10 = 15;

		$pdf->SetY($yAxis);
		$pdf->SetX($xAxis);
		$pdf->SetFillColor(211,211,211);
		$pdf->CellFitScale($col1,14,"",1, 0, 'C', true);
		$pdf->CellFitScale($col2,14,"",1, 0, 'C', true);
		$pdf->CellFitScale($col3,14," ",1, 0, 'C', true);
		$pdf->CellFitScale($col4,14," ",1, 0, 'C', true);
		$pdf->CellFitScale($col5,14,"  ",1, 0, 'C', true);
		$pdf->CellFitScale($col6,14," ",1, 0, 'C', true);
		$pdf->CellFitScale($col7,14," ",1, 0, 'C', true);
		$pdf->CellFitScale($col8,14," ",1, 0, 'C', true);
		$pdf->CellFitScale($col9,14,"",1, 0, 'C', true);
		$pdf->CellFitScale($col10,14,"",1, 0, 'C', true);
		$pdf->SetFillColor(0,0,0);

		$yAxis = $yAxis+2;
		$pdf->SetY($yAxis);
		$pdf->SetX($xAxis);
		$pdf->SetFont('Times','B',10);
		$pdf->CellFitScale($col1,12,"#",0, 0, 'C');
		$pdf->CellFitScale($col2,12,"J.O. Number",0, 0, 'C');
		$pdf->CellFitScale($col3,12,"Client Name",0, 0, 'C');
		$pdf->CellFitScale($col4,12,"Client Address",0, 0, 'C');
		$pdf->CellFitScale($col5,5,"Client Contact",0, 0, 'C');
		$pdf->CellFitScale($col6,12,"Patient Name",0, 0, 'C');
		$pdf->CellFitScale($col7,12,"Total Price",0, 0, 'C');
		$pdf->CellFitScale($col8,12,"Technician Name",0, 0, 'C');
		$pdf->CellFitScale($col9,5,"Tech",0, 0, 'C');
		$pdf->CellFitScale($col10,12,"Status",0, 0, 'C');

		$yAxis = $yAxis+5;
		$pdf->SetY($yAxis);
		$pdf->SetX($xAxis);
		$pdf->CellFitScale($col1,7,"",0, 0, 'C');
		$pdf->CellFitScale($col2,7,"",0, 0, 'C');
		$pdf->CellFitScale($col3,7,"",0, 0, 'C');
		$pdf->CellFitScale($col4,7,"",0, 0, 'C');
		$pdf->CellFitScale($col5,5,"Number",0, 0, 'C');
		$pdf->CellFitScale($col6,7," ",0, 0, 'C');
		$pdf->CellFitScale($col7,7," ",0, 0, 'C');
		$pdf->CellFitScale($col8,7," ",0, 0, 'C');
		$pdf->CellFitScale($col9,5,"Commision",0, 0, 'C');
		$pdf->CellFitScale($col10,7,"",0, 0, 'C');


		$pCtr = 0;
		$dLength = count($data);

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
			$pdf->CellFitScale($col2,7,$data[$i]['job_order_id'],1, 0, 'C');
			$pdf->CellFitScale($col3,7,$data[$i]['client_name'],1, 0, 'C');
			$pdf->CellFitScale($col4,7,$data[$i]['address'],1, 0, 'C');
			$pdf->CellFitScale($col5,7,$data[$i]['contact_number'],1, 0, 'C');
			$pdf->CellFitScale($col6,7,$data[$i]['patient_name'],1, 0, 'C');
			$pdf->CellFitScale($col7,7,"P ".number_format($data[$i]['total_price']),1, 0, 'C');
			$pdf->CellFitScale($col8,7,$data[$i]['technician_name'],1, 0, 'C');
			$pdf->CellFitScale($col9,7,"P ".number_format($data[$i]['technician_percentage']),1, 0, 'C');
			$pdf->CellFitScale($col10,7,$data[$i]['status'],1, 0, 'C');
			$total += $data[$i]['total_price'];
			
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
		$pdf->CellFitScale($col2,7,"","BT", 0, 'C', true);
		$pdf->CellFitScale($col3,7,"","BT", 0, 'C', true);
		$pdf->CellFitScale($col4,7,"","BT", 0, 'C', true);
		$pdf->CellFitScale($col5,7,"","BT", 0, 'C', true);
		$pdf->CellFitScale($col6,7,"TOTAL: ","BTR", 0, 'R', true);
		$pdf->CellFitScale($col7,7,"P".number_format($total),"BTL", 0, 'C', true);
		$pdf->CellFitScale($col8,7,"","BT", 0, 'C', true);
		$pdf->CellFitScale($col9,7,"","BT", 0, 'C', true);
		$pdf->CellFitScale($col10,7,"","BTR", 0, 'C', true);

		$filename = "../pdf/jobOrdersTable.pdf";
		$pdf->Output($filename,'F');

	}

?>